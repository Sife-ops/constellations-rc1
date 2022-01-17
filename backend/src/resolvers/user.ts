import argon2 from "argon2";
import { AuthContext, auth } from "../utility/auth";
import { User } from "../entities/user";
import { cookieOptions } from "../utility/constants";
import { newAccessToken, newRefreshToken } from "../utility/token";

import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Int,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx,
} from "type-graphql";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  // create
  @Mutation(() => Boolean)
  async register(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string
  ): Promise<boolean> {
    if (!username || !password) return false;
    const found = await User.findOne({
      where: {
        username,
      },
    });
    if (found) return false;
    // todo: need try/cetch?
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      username,
      password: hashedPassword,
    }).save();
    if (user) return true;
    return false;
  }

  // read
  @Mutation(() => LoginResponse)
  async login(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { res }: AuthContext
  ): Promise<LoginResponse> {
    const found = await User.findOne({
      where: {
        username,
      },
    });

    if (!found) throw new Error("user does not exist");

    let isVerified: boolean;
    try {
      isVerified = await argon2.verify(found.password, password);
    } catch (e) {
      console.log(e);
      throw new Error("could not decrypt password");
    }

    if (isVerified) {
      const payload = {
        userId: found.id,
        username: found.username,
      };
      res.cookie("refreshToken", newRefreshToken(payload), cookieOptions);
      return { accessToken: newAccessToken(payload) };
    }
    throw new Error("incorrect password");
  }

  @Query(() => User)
  @UseMiddleware(auth)
  async user(@Ctx() { payload }: AuthContext): Promise<User> {
    const user = await User.findOne(payload.userId);
    if (!user) throw new Error("cannot find user");
    return user;
  }

  // update
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async updateUser(
    @Arg("password", () => String) password: string,
    @Ctx() { payload }: AuthContext
  ): Promise<boolean> {
    const user = await User.findOne(payload.userId);
    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;
    await user.save();
    return true;
  }

  // delete
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async deleteUser(@Ctx() { payload }: AuthContext): Promise<boolean> {
    const user = await User.findOne(payload.userId);
    if (!user) return false;
    await User.remove(user);
    return true;
  }

  // todo: delete
  @Query(() => String)
  @UseMiddleware(auth)
  queryAuthTest(@Ctx() { payload }: AuthContext) {
    return `authorized ${payload.userId}`;
  }
  @Mutation(() => String)
  @UseMiddleware(auth)
  mutAuthTest(@Ctx() { payload }: AuthContext) {
    return `authorized ${payload.userId}`;
  }
  @Query(() => [User])
  async users() {
    return await User.find();
  }
}
