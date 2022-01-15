import React from "react";
import { getAccessToken, setAccessToken } from "../utility/token";
import { useUsersQuery } from "../generated/graphql";
import { QueryAuthTest } from "../component/query-auth-test";

export const Dev: React.FC = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  const border = {
    border: "1px solid green",
  };

  return (
    <div>
      <div style={border}>
        {loading ? (
          //
          <div>loading...</div>
        ) : (
          //
          <div>{JSON.stringify(data)}</div>
        )}
      </div>
      <br />

      <button onClick={() => console.log(getAccessToken())}>
        log access token
      </button>
      <br />
      <br />

      <button
        onClick={async () => {
          const res = await fetch("http://localhost:4000/refresh", {
            method: "POST",
            credentials: "include",
          });
          const data = await res.json();
          console.log(data);
          setAccessToken(data.accessToken);
        }}
      >
        refresh token
      </button>
      <br />
      <br />

      <button
        onClick={async () => {
          const res = await fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include",
          });
          // const data =
          // console.log(data);
          setAccessToken("");
          window.location.reload();
        }}
      >
        logout
      </button>
      <br />
      <br />

      <div style={border}>
        <h3>query auth test</h3>
        <QueryAuthTest />
      </div>
    </div>
  );
};
