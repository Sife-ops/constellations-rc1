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
  @Mutation(() => Category)
  @UseMiddleware(auth)
  async createCategory(
    @Arg("name", () => String) name: string,
    @Ctx() { payload }: AuthContext
  ): Promise<Category> {
    const user = await User.findOne(payload.userId);
    return await Category.create({ name, user }).save();
  }

  // read
  @Query(() => Category)
  @UseMiddleware(auth)
  async category(@Arg("id", () => Int) id: number): Promise<Category> {
    const category = await Category.findOne(id);
    if (!category) throw new Error("cannot find category");
    return category;
  }

  // todo: fix entity column "userId" not found
  @Query(() => [Category])
  @UseMiddleware(auth)
  async categories(@Ctx() { payload }: AuthContext): Promise<Category[]> {
    return await Category.find({
      relations: ["user"],
      where: { userId: payload.userId },
    });
  }

  // update
  @Mutation(() => Category)
  @UseMiddleware(auth)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string,
    @Ctx() { payload }: AuthContext
  ): Promise<Category> {
    const category = await Category.findOne(id, {
      relations: ["user"],
    });
    if (!category) throw new Error("cannot find category");
    // if (category.user.id !== payload.userId) return false;
    category.name = name;
    return await category.save();
  }

  // delete
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async deleteCategory(
    @Arg("id", () => Int) id: number,
    @Ctx() { payload }: AuthContext
  ): Promise<Boolean> {
    const category = await Category.findOne(id);
    if (!category) throw new Error("cannot find category");
    await Category.remove(category);
    return true;
  }
}
