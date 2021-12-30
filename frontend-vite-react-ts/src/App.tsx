import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./components/home";
import About from "./components/about";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header>
        <h1 className="aaa">Constellations</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
