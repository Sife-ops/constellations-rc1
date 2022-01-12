import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./utility/context";
import { authExchange, AuthConfig } from "@urql/exchange-auth";
import { createClient, makeOperation, Provider } from "urql";
import { getAccessToken, setAccessToken } from "./utility/token";

const authConfig: AuthConfig<{ accessToken: string }> = {
  addAuthToOperation: ({ authState, operation }) => {
    console.log("addAuthToOperation");
    if (!authState || !authState.accessToken) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          authorization: `Bearer ${authState.accessToken}`,
        },
      },
    });
  },

  willAuthError: ({ authState }) => {
    console.log("willAuthError");
    if (!authState || !authState.accessToken) return true;
    const decoded: any = jwt_decode(authState.accessToken);
    const exp = decoded.exp as number;
    const now = new Date().getTime();
    // console.log(now);
    // console.log(exp * 1000);
    return now > exp * 1000;
  },

  getAuth: async ({ authState, mutate }) => {
    console.log("getAuth");
    if (!authState) {
      const accessToken = getAccessToken();
      if (accessToken) {
        return { accessToken };
      }
      return null;
    }

    console.log("refresh");
    const res = await fetch("http://localhost:4000/refresh", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    console.log("set token");
    if (data.ok) {
      setAccessToken(data.accessToken);
      return {
        accessToken: data.accessToken,
      };
    }

    setAccessToken("");
    return null;
  },
};

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  // exchanges: [authExchange(authConfig)],
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Provider value={client}>
          <App />
        </Provider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
