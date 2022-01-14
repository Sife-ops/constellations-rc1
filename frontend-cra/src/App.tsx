import "./App.css";
import React from "react";
import { Dev } from "./component/dev";
import { Home } from "./component/home";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dev">Dev</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
