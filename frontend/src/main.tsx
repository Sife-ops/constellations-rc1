import App from "./App";
import React from "react";
import decode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner } from "./component/loading-spinner";
import { LoginRegister } from "./component/login-register";
import { env } from "./utility/constant";
import { globalContext } from "./utility/context";
import { setAccessToken } from "./utility/token";

export const Main: React.FC = () => {
  const { setUserId } = React.useContext(globalContext);

  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    fetch(`${env.apiUrl}/refresh`, {
      method: "POST",
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          const decoded = decode<{ userId: number }>(data.accessToken);
          setUserId(decoded.userId);
          setLoggedIn(true);
        }
        setLoading(false);
      })
    );
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!loggedIn) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route //
              path="/login"
              element={<LoginRegister variant="login" />}
            />
            <Route //
              path="/register"
              element={<LoginRegister variant="register" />}
            />
            <Route //
              path="*"
              element={<Navigate replace to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return <App />;
};
