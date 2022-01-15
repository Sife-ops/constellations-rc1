// todo: favicon
// todo: handle empty bookmarks
// todo: category colors
// todo: donate tab
// todo: category accordion
// todo: bookmark title and description popover
// todo: context menus

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import logo from "./logo.svg";
import { About } from "./components/about";
import { Dev } from "./components/dev";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { ModalContainer } from "./components/modal/modal-container";
import { NavBar } from "./components/navbar";
import { Register } from "./components/register";
import { Routes, Route } from "react-router-dom";
import { authConfig } from "./utility/auth-config";
import { authExchange } from "@urql/exchange-auth";
import { createClient, Provider } from "urql";
import { globalContext } from "./utility/context";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [authExchange(authConfig)],
});

const client2 = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function App() {
  const {
    globalState: { login },
  } = React.useContext(globalContext);

  return (
    <div>
      <ModalContainer />
      <NavBar logo={logo} />
      <div className="mx-2">
        {login ? (
          <Provider value={client}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dev" element={<Dev />} /> */}
            </Routes>
          </Provider>
        ) : (
          <Provider value={client2}>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dev" element={<Dev />} />
            </Routes>
          </Provider>
        )}
      </div>
    </div>
  );
}

export default App;
