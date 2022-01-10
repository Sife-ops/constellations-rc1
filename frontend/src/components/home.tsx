import React from "react";
import mockUserBookmark from "../mock-data/user.json";
import { BookmarkType } from "../utility/type";
import { Filter } from "./filter/filter";
import { LoadingSpinner } from "./loading-spinner";
import { useQuery } from "urql";
import { userBookmark } from "../utility/request";

export const Home: React.FC = () => {
  const [res, reexec] = useQuery({
    query: userBookmark,
    variables: { id: 1 },
  });
  const { data, fetching, error } = res;

  if (fetching) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <div>{JSON.stringify(error)}</div>;
  }

  // todo: use environment variable to toggle mock data
  const bookmarks = data.user.bookmarks as BookmarkType[];
  // const bookmarks = mockUserBookmark.data.user.bookmarks as BookmarkType[];

  return <Filter bookmarks={bookmarks} />;
};
