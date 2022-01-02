// todo: favicon
// todo: handle empty bookmarks or categories

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import userData from "./mock-data/user.json";
import { About } from "./components/about";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Home } from "./components/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar className="mb-2" bg="primary" variant="dark">
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
