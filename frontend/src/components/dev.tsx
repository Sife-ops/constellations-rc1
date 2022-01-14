import React from "react";
import { useMutation } from "urql";
import { globalContext } from "../utility/context";

export const Dev: React.FC = () => {
  const { setGlobalState } = React.useContext(globalContext);

  const [test, setTest] = React.useState("");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [myAccessToken, setMyAccessToken] = React.useState("");

  const [registerRes, loginMutation] = useMutation(`
    mutation Login($password: String!, $username: String!) {
      login(password: $password, username: $username) {
        accessToken
      }
    }
  `);

  const [authRes, authMutation] = useMutation(`
    mutation Mutation {
      authTest
    }
  `);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("login");
          fetch("http://localhost:4000/test", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setTest(JSON.stringify(data));
            });
        }}
      >
        <button
          //
          type="submit"
        >
          /test
        </button>
        {test}
      </form>

      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation(
            {
              username,
              password,
            },
            {
              url: "http://localhost:4000/graphql",
              fetchOptions: {
                credentials: "include",
              },
            }
          ).then((res) => {
            const accessToken = res.data.login.accessToken;
            setMyAccessToken(accessToken);
            sessionStorage.setItem("accessToken", accessToken);
            console.log(sessionStorage.getItem("accessToken"));
          });
        }}
      >
        <div>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
        <br />
        {myAccessToken}
      </form>

      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(sessionStorage.getItem("accessToken"));
        }}
      >
        <button type="submit">log access token</button>
        <br />
      </form>

      <br />

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await fetch("http://localhost:4000/refresh", {
            method: "POST",
            credentials: "include",
          });

          const data = await res.json();

          sessionStorage.setItem("accessToken", data.accessToken);
          console.log(sessionStorage.getItem("accessToken"));
        }}
      >
        <button type="submit">refresh</button>
      </form>

      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          authMutation().then((res) => {
            console.log(res);
          });
        }}
      >
        <button type="submit">authorized</button>
      </form>

      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGlobalState((state) => ({
            ...state,
            login: true,
          }));
        }}
      >
        <button type="submit">force login</button>
      </form>
    </div>
  );
};
