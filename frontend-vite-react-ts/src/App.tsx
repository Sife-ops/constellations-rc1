// todo: favicon
// todo: handle empty bookmarks
// todo: category colors
// todo: edit/delete bookmarks
// todo: edit/delete categories
// todo: donate tab
// todo: category accordion
// todo: bookmark title and description popover

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import userData from "./mock-data/user.json";
import { About } from "./components/about";
import { Home } from "./components/home/home";
import { ModalWindow } from "./components/modal";
import { NavBar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <ModalWindow />
      <NavBar logo={logo} />
      <div className="mx-2">
        <Routes>
          <Route
            path="/"
            element={<Home bookmarks={userData.data.user.bookmarks} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
