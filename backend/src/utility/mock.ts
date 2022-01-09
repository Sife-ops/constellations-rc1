import { Bookmark } from "../entities/bookmark";
import { Category } from "../entities/category";
import { User } from "../entities/user";

const bookmarks = require("../../mock-data/bookmark.json");
const categories = require("../../mock-data/category.json");
const users = require("../../mock-data/user.json");

export const seed = async () => {
  try {
    for (const user of users) {
      await User.create({
        username: user.username,
        password: user.password,
      }).save();
    }
    const mockUsers = await User.find();

    for (const category of categories) {
      await Category.create({
        name: category.name,
      }).save();
    }
    const mockCategories = await Category.find();

    for (const bookmark of bookmarks) {
      // const tries = randomInd(mockCategories, 1);
      let tries: number;
      while (true) {
        tries = randomInd(mockCategories, 1);
        if (tries > 3) continue;
        break;
      }
      let inds: number[] = [];
      for (let i = 0; i < tries; i++) {
        while (true) {
          const ind = randomInd(mockCategories);
          if (inds.includes(ind)) continue;
          inds = [...inds, ind];
          break;
        }
      }
      await Bookmark.create({
        description: bookmark.description,
        url: bookmark.url,
        categories: inds.map((e) => mockCategories[e]),
        user: mockUsers[randomInd(mockUsers)],
      }).save();
    }

    console.log("finished seed");
  } catch (e) {
    throw e;
  }
};

const randomInd = (arr: any[], plus: number = 0) => {
  return Math.floor(Math.random() * (arr.length + plus));
};
