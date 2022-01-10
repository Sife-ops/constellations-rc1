import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

import { Bookmark } from "../entities/bookmark";
import { Category } from "../entities/category";
import { User } from "../entities/user";

@InputType()
class CreateBookmarkOptions {
  @Field()
  description: string;

  @Field()
  url: string;

  @Field(() => Int)
  userId: number;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];
}

@InputType()
class BookmarkUpdateOptions {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];
}

@Resolver()
export class BookmarkResolver {
  // create
  @Mutation(() => Bookmark)
  async createBookmark(
    @Arg("options", () => CreateBookmarkOptions) options: CreateBookmarkOptions
  ) {
    let categories: Category[] = [];
    if (options.categoryIds) {
      categories = await Category.findByIds(options.categoryIds);
    }
    const user = await User.findOne(options.userId);
    const bookmark = await Bookmark.create({
      description: options.description,
      url: options.url,
      categories,
      user,
    }).save();
    return bookmark;
  }

  // read
  @Query(() => Bookmark)
  async bookmark(@Arg("id", () => Int) id: number) {
    return await Bookmark.findOne(id);
  }

  @Query(() => [Bookmark])
  async bookmarks() {
    return await Bookmark.find();
  }

  // update
  @Mutation(() => Boolean)
  async updateBookmark(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => BookmarkUpdateOptions) options: BookmarkUpdateOptions
  ) {
    const bookmark = await Bookmark.findOne(id);
    if (!bookmark) {
      return false;
    }
    if (options.description) bookmark.description = options.description;
    if (options.url) bookmark.url = options.url;
    if (options.categoryIds) {
      const categories = await Category.findByIds(options.categoryIds);
      bookmark.categories = categories;
    }
    await bookmark.save();
    return true;
  }

  // delete
  @Mutation(() => Boolean)
  async deleteBookmark(@Arg("id", () => Int) id: number) {
    const b = await Bookmark.findOne(id);
    if (!b) {
      return false;
    }
    const r = await Bookmark.remove(b);
    if (!r) {
      return false;
    }
    return true;
  }
}
