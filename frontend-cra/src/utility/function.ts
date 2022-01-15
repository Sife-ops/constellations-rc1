import { BookmarkType, CategoryType } from "./type";

export const categoryNone: CategoryType = {
  id: "0",
  name: "No Category",
  count: 0,
  selected: false,
};

// todo: compute category count on backend
// todo: "No Category" category before others
export const reduceCategories = (bookmarks: BookmarkType[]): CategoryType[] => {
  return bookmarks
    .reduce((previous: CategoryType[], current: BookmarkType) => {
      if (current.categories.length < 1) {
        return [...previous, categoryNone];
      }
      return [...previous, ...current.categories];
    }, [])
    .reduce((previous: CategoryType[], current: CategoryType) => {
      let found = false;
      const returns = previous.map((e) => {
        if (e.id === current.id) {
          found = true;
          return { ...e, count: e.count ? e.count + 1 : 1 };
        }
        return e;
      });
      if (found) {
        return returns;
      }
      return returns.concat({
        ...current,
        count: 1,
        selected: false,
      });
    }, []);
};
