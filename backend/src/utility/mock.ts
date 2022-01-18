import { Bookmark } from "../entities/bookmark";
import { Category } from "../entities/category";
import { User } from "../entities/user";

const mockBookmarks = require("../../mock-data/bookmark.json").slice(0, 100);
// const mockBookmarks = require("../../mock-data/bookmark.json")
const mockCategories = require("../../mock-data/category.json");
const mockUsers = require("../../mock-data/user.json").slice(0, 3);
// const mockUsers = require("../../mock-data/user.json")

export const seed = async () => {
  for (const { username, password } of mockUsers) {
    await User.create({ username, password }).save();
  }
  let foundUsers = await User.find();

  for (const foundUser of foundUsers) {
    let tries = randomInd(mockCategories, 1);
    if (tries < 3) tries = 3;

    let categoryObjs: { name: string }[] = [];
    for (let i = 0; i < tries; i++) {
      while (true) {
        const ind = randomInd(mockCategories);
        const cat = mockCategories[ind];
        const found = categoryObjs.find((e) => e.name === cat.name);
        if (found) continue;
        categoryObjs = [...categoryObjs, cat];
        break;
      }
    }

    let categories: Category[] = [];
    for (const { name } of categoryObjs) {
      const category = await Category.create({ name }).save();
      categories = [...categories, category];
    }

    foundUser.categories = categories;
    await foundUser.save();
  }

  for (const { url, description } of mockBookmarks) {
    const foundUsers = await User.find({
      relations: ["categories", "bookmarks"],
    });
    const foundUser = foundUsers[randomInd(foundUsers)];

    const bookmark = await Bookmark.create({ url, description }).save();
    foundUser.bookmarks = [...foundUser.bookmarks, bookmark];
    await foundUser.save();

    const tries = randomInd(foundUser.categories, 1);
    let categoryIds: number[] = [];
    for (let i = 0; i < tries; i++) {
      while (true) {
        const category = foundUser.categories[randomInd(foundUser.categories)];
        const found = categoryIds.find((e) => e === category.id);
        if (found) continue;
        categoryIds = [...categoryIds, category.id];
        break;
      }
    }

    for (const categoryId of categoryIds) {
      const category = await Category.findOne(categoryId, {
        relations: ["bookmarks"],
      });
      if (category) {
        category.bookmarks = [...category.bookmarks, bookmark];
        await category.save();
      }
    }
  }

  console.log("finished seed");
};

const randomInd = (arr: any[], plus: number = 0) => {
  return Math.floor(Math.random() * (arr.length + plus));
};
