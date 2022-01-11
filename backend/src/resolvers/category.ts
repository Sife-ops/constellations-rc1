import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/category";

@Resolver()
export class CategoryResolver {
  // create
  @Mutation(() => Category)
  async createCategory(@Arg("name", () => String) name: string) {
    return await Category.create({ name }).save();
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
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string
  ) {
    await Category.update(id, { name });
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
