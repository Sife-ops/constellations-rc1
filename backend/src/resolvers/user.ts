import argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../entities/user";
import { env } from "../utility/constants";

import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Int,
  ObjectType,
  Field,
  UseMiddleware,
  MiddlewareFn,
  Ctx,
} from "type-graphql";

@ObjectType()
class LoginResponse {
  @Field()
  ok: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field()
  accessToken: string;
}

const isAuth: MiddlewareFn = async ({ context }, next) => {
  return true;
};

@Resolver()
export class UserResolver {
  // create
  @Mutation(() => Boolean)
  async register(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string
  ) {
    if (!username || !password) return false;
    const found = await User.findOne({
      where: {
        username,
      },
    });
    if (found) return false;
    // todo: need try/fetch?
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      username,
      password: hashedPassword,
    }).save();
    if (user) return true;
    return false;
  }

  // read
  @Query(() => LoginResponse)
  async login(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { res }: { req: Request; res: Response }
  ): Promise<LoginResponse> {
    const bad: LoginResponse = { ok: false, accessToken: "" };
    if (!username || !password) return bad;
    const found = await User.findOne({
      where: {
        username,
      },
    });
    if (!found) return { ...bad, message: "incorrect username" };
    // todo: need try/fetch?
    const isVerified = await argon2.verify(found.password, password);
    if (isVerified) {
      const payload = { userId: found.id };
      res.cookie("refreshToken", sign(payload, env.secret_refresh_token));
      return {
        ok: true,
        accessToken: sign(payload, env.secret_access_token),
      };
    }
    return { ...bad, message: "incorrect password" };
  }

  @Query(() => User)
  async user(@Arg("id", () => Int) id: number) {
    return await User.findOne(id);
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  // auth
  @Query(() => String)
  @UseMiddleware(isAuth)
  authTest() {
    return "authorized";
  }

  // update
  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("password", () => String) password: string
  ) {
    await User.update(id, { password });
    return true;
  }

  // delete
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    const u = await User.findOne(id);
    if (!u) {
      return false;
    }
    const r = await User.remove(u);
    if (!r) {
      return false;
    }
    return true;
  }
}
