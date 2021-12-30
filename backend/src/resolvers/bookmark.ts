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
class BookmarkOptions {
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
}

@Resolver()
export class BookmarkResolver {
  // create
  @Mutation(() => Bookmark)
  async createBookmark(
    @Arg("options", () => BookmarkOptions) options: BookmarkOptions
  ) {
    let categories: User[] = [];
    if (options.categoryIds) {
      categories = await User.findByIds(options.categoryIds);
    }
    const user = await User.findOne(options.userId);
    return await Bookmark.create({
      description: options.description,
      url: options.url,
      categories,
      user,
    }).save();
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
    await Bookmark.update(id, options);
    return true;
  }

  @Mutation(() => Boolean)
  async addBookmarkCategory(
    @Arg("bookmarkId", () => Int) bookmarkId: number,
    @Arg("categoryId", () => Int) categoryId: number
  ) {
    const category = await Category.findOne(categoryId);
    const bookmark = await Bookmark.findOne(bookmarkId, {
      relations: ["categories"],
    });
    if (!category || !bookmark) {
      return false;
    }
    for (const c of bookmark.categories) {
      if (c.name === category.name) {
        return false;
      }
    }
    bookmark.categories = bookmark.categories.concat(category);
    await bookmark.save();
    return true;
  }

  @Mutation(() => Boolean)
  async removeBookmarkCategory(
    @Arg("bookmarkId", () => Int) bookmarkId: number,
    @Arg("categoryId", () => Int) categoryId: number
  ) {
    const category = await Category.findOne(categoryId);
    const bookmark = await Bookmark.findOne(bookmarkId, {
      relations: ["categories"],
    });
    if (!category || !bookmark) {
      return false;
    }
    bookmark.categories = bookmark.categories.filter(
      (e) => e.name !== category.name
    );
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
