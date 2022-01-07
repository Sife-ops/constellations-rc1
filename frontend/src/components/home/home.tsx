import React from "react";
import { LoadingSpinner } from "../loading-spinner";
import { useQuery } from "urql";
import { userBookmark } from "../../utility/request";
import { FilterNew } from "./filter-categories";

export const Home: React.FC = () => {
  const [res, reexec] = useQuery({
    query: userBookmark,
    variables: { userId: 1 },
  });
  const { data, fetching, error } = res;

  if (fetching) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <div>{JSON.stringify(error)}</div>;
  }

  return <FilterNew bookmarks={data.user.bookmarks} />
};
