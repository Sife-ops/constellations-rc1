import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Int,
} from "type-graphql";

import { User } from "../entities/user";

@InputType()
class UserOptions {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
class UserUpdateOptions {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  password?: string;
}

@Resolver()
export class UserResolver {
  // create
  @Mutation(() => User)
  async createUser(@Arg("options", () => UserOptions) options: UserOptions) {
    return await User.create(options).save();
  }

  // read
  @Query(() => User)
  async user(@Arg("id", () => Int) id: number) {
    return await User.findOne(id);
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  // update
  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => UserUpdateOptions) options: UserUpdateOptions
  ) {
    await User.update(id, options);
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
