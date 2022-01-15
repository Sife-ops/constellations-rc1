import "./App.css";
import React from "react";
import { Dev } from "./component/dev";
import { Home } from "./component/home";
import { ModalContainer } from "./component/modal/modal-container";
import { NavBar } from "./component/navbar";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <ModalContainer />
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
