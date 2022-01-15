import App from "./App";
import React from "react";
import { Login } from "./component/login";
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
  if (!loggedIn) return <Login />;
  return <App />;
};
