import { AuthContext, auth } from "../utility/auth";
import { Category } from "../entities/category";
import { User } from "../entities/user";

import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver()
export class CategoryResolver {
  // create
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async createCategory(
    @Arg("name", () => String) name: string,
    @Ctx() { payload }: AuthContext
  ) {
    const user = await User.findOne(payload.userId);
    await Category.create({ name, user }).save();

    return true;
  }

  // read
  @Query(() => Category)
  async category(@Arg("id", () => Int) id: number) {
    return await Category.findOne(id);
  }

  @Query(() => [Category])
  async categories() {
    return await Category.find();
  }

  // update
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string,
    @Ctx() { payload }: AuthContext
  ) {
    const category = await Category.findOne(id, {
      relations: ["user"],
    });
    if (!category || !payload?.userId) return false;

    category.name = name;
    await category.save();

    return true;
  }

  // delete
  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => Int) id: number) {
    const c = await Category.findOne(id);
    if (!c) {
      return false;
    }
    const r = await Category.remove(c);
    if (!r) {
      return false;
    }
    return true;
  }
}
