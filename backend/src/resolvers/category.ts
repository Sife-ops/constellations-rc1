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
  async categoryCreate(
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

  @Query(() => [Category])
  @UseMiddleware(auth)
  async categories(@Ctx() { payload }: AuthContext): Promise<Category[]> {
    const user = await User.findOne(payload.userId);
    return await Category.find({ where: { user } });
  }

  // update
  @Mutation(() => Category)
  @UseMiddleware(auth)
  async categoryUpdate(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string,
  ): Promise<Category> {
    const category = await Category.findOne(id);
    if (!category) throw new Error("cannot find category");
    category.name = name;
    return await category.save();
  }

  // delete
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async categoryDelete(
    @Arg("id", () => Int) id: number,
    @Ctx() { payload }: AuthContext
  ): Promise<Boolean> {
    const category = await Category.findOne(id);
    if (!category) throw new Error("cannot find category");
    await Category.remove(category);
    return true;
  }
}
