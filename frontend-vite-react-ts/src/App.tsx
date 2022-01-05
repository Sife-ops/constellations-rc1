// todo: favicon
// todo: handle empty bookmarks
// todo: category colors
// todo: edit/delete bookmarks
// todo: edit/delete categories
// todo: donate tab

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import logo from "./logo.svg";
import userData from "./mock-data/user.json";
import { About } from "./components/about";
import { Home } from "./components/home";
import { ModalState } from "./utility/types";
import { ModalWindow } from "./components/modal";
import { NavBar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";

import { C1 } from "./components/c1";

function App() {
  const [modal, setModal] = React.useState<ModalState>({ show: false });

  return (
    <div>
      <C1 />
      <ModalWindow modalState={[modal, setModal]} />
      <NavBar logo={logo} />
      <div className="mx-2">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                bookmarks={userData.data.user.bookmarks}
                setModal={setModal}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
