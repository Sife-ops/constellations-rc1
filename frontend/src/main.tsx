import App from "./App";
import React from "react";
import decode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner } from "./component/loading-spinner";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { globalContext } from "./utility/context";
import { setAccessToken } from "./utility/token";

export const Main: React.FC = () => {
  const { setUserId } = React.useContext(globalContext);

  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:4000/refresh", {
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return <App />;
};
