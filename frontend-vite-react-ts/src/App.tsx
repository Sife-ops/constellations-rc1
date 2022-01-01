// todo: favicon
// todo: add category button
// todo: clear button
// todo: compute user bookmark count on backend
// todo: filter criteria dropdown button
// todo: filter on click
// todo: filter on description or url
// todo: handle empty bookmarks

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import userData from "./mock-data/user.json";
import { About } from "./components/about";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Home } from "./components/home";
import { Routes, Route } from "react-router-dom";
import { Bookmark } from "./utility/types";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand id="id1" href="/">
            <img src={logo} width="30" height="30" /> Constellations
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/login">USER</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<Home bookmarks={userData.data.user.bookmarks} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
