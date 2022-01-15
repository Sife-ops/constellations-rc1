import jwt_decode from "jwt-decode";
import { AuthConfig } from "@urql/exchange-auth";
import { makeOperation } from "urql";
// import {getAccessToken,setAccessToken} from "../utility/token"

export const authConfig: AuthConfig<{ accessToken: string }> = {
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
      const accessToken = sessionStorage.getItem("accessToken");
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
      sessionStorage.setItem("accessToken", data.accessToken);
      return {
        accessToken: data.accessToken,
      };
    }

    sessionStorage.removeItem("accessToken");
    return null;
  },
};
