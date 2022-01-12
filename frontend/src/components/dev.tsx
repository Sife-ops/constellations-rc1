import React from "react";
import { useMutation } from "urql";

export const Dev: React.FC = () => {
  const [test, setTest] = React.useState("");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [accessToken, setAccessToken] = React.useState("");

  const [registerRes, registerMutation] = useMutation(`
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
          registerMutation({
            username,
            password,
          }).then((res) => {
            console.log(res.data.login.accessToken);
            setAccessToken(res.data.login.accessToken);
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
        {accessToken}
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

          console.log(data);

          // if (res.ok) {
          //   console.log(res.json())
          // }

          // fetch("http://localhost:4000/refresh", {
          //   method: "POST",
          //   credentials: "include",
          // })
          //   .then((res) => res.json())
          //   .then((data) => console.log(data));
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
    </div>
  );
};
