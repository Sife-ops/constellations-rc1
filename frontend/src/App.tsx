import "./App.css";
import React from "react";
import { Dev } from "./component/dev";
import { Home } from "./component/home";
import { NavBar } from "./component/navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
