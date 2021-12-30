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
      await Bookmark.create({
        description: bookmark.description,
        url: bookmark.url,
        categories: [
          mockCategories[Math.floor(Math.random() * mockCategories.length)],
        ],
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
      }).save();
    }

    console.log("finished seed");
  } catch (e) {
    throw e;
  }
};
