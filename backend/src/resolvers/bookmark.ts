import { AuthContext, auth } from "../utility/auth";
import { Bookmark } from "../entities/bookmark";
import { Category } from "../entities/category";
import { User } from "../entities/user";

import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Ctx,
} from "type-graphql";

@InputType()
class BookmarkCreateOptions {
  @Field()
  description: string;

  @Field()
  url: string;

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
  @UseMiddleware(auth)
  async bookmarkCreate(
    @Arg("options", () => BookmarkCreateOptions) options: BookmarkCreateOptions,
    @Ctx() { payload }: AuthContext
  ): Promise<Bookmark> {
    let categories: Category[] = [];
    if (options.categoryIds) {
      categories = await Category.findByIds(options.categoryIds);
    }
    const user = await User.findOne(payload.userId);
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
  @UseMiddleware(auth)
  async bookmark(@Arg("id", () => Int) id: number): Promise<Bookmark> {
    const bookmark = await Bookmark.findOne(id);
    if (!bookmark) throw new Error("cannot find bookmark");
    return bookmark;
  }

  @Query(() => [Bookmark])
  @UseMiddleware(auth)
  async bookmarks(@Ctx() { payload }: AuthContext): Promise<Bookmark[]> {
    const user = await User.findOne(payload.userId);
    return await Bookmark.find({ where: { user } });
  }

  // update
  @Mutation(() => Bookmark)
  @UseMiddleware(auth)
  async bookmarkUpdate(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => BookmarkUpdateOptions) options: BookmarkUpdateOptions
  ): Promise<Bookmark> {
    const bookmark = await Bookmark.findOne(id);
    if (!bookmark) throw new Error("cannot find bookmark");
    if (options.description) bookmark.description = options.description;
    if (options.url) bookmark.url = options.url;
    if (options.categoryIds) {
      const categories = await Category.findByIds(options.categoryIds);
      bookmark.categories = categories;
    }
    return await bookmark.save();
  }

  // delete
  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async bookmarkDelete(@Arg("id", () => Int) id: number): Promise<Boolean> {
    const bookmark = await Bookmark.findOne(id);
    if (!bookmark) throw new Error("cannot find bookmark");
    await Bookmark.remove(bookmark);
    return true;
  }
}
