import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import decode, { JwtPayload } from "jwt-decode";
import reportWebVitals from "./reportWebVitals";
import { GlobalProvider } from "./utility/context";
import { Main } from "./main";
import { getAccessToken, setAccessToken } from "./utility/token";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  let token = getAccessToken();

  let expired = false;
  if (token) {
    const decoded = decode<JwtPayload>(token);
    const now = new Date().getTime();
    if (decoded.exp) {
      // todo: debut env var
      // console.log("current time  ", now);
      // console.log("token expires ", decoded.exp * 1000);
      if (now > decoded.exp * 1000) expired = true;
    }
  }

  if (!token || expired) {
    const res = await fetch("http://localhost:4000/refresh", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      token = data.accessToken;
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Main />
      </GlobalProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
