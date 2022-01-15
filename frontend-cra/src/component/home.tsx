import React from "react";
import mockUserBookmark from "../mock-data/user.json";
import { BookmarkType } from "../utility/type";
import { Filter } from "./filter/filter";
// import { LoadingSpinner } from "./loading-spinner";

export const Home: React.FC = () => {
  // todo: use environment variable to toggle mock data
  // const bookmarks = data.user.bookmarks as BookmarkType[];
  const bookmarks = mockUserBookmark.data.user.bookmarks as BookmarkType[];

  return <Filter bookmarks={bookmarks} />;
};
