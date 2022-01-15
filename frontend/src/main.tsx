import App from "./App";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { setAccessToken } from "./utility/token";

export const Main: React.FC = () => {
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
          setLoggedIn(true);
        }
        setLoading(false);
      })
    );
  }, []);

  if (loading) return <div>loading...</div>;

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
