import React from "react";
import { useQueryAuthTestQuery } from "../generated/graphql";

export const QueryAuthTest: React.FC = () => {
  const { data, loading, error } = useQueryAuthTestQuery({
    fetchPolicy: "network-only",
  });

  if (loading) return <div>loading...</div>;

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (!data) return <div>no data</div>;

  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};
