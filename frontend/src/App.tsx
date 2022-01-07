// todo: favicon
// todo: handle empty bookmarks
// todo: category colors
// todo: donate tab
// todo: category accordion
// todo: bookmark title and description popover
// todo: context menus

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import userData from "./mock-data/user.json";
import { About } from "./components/about";
import { Home } from "./components/home/home";
import { ModalContainer } from "./components/modal/modal-container";
import { NavBar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <ModalContainer />
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
