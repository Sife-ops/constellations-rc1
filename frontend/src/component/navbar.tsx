import React from "react";
import logo from "../logo.png";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { setAccessToken } from "../utility/token";

const handleLogout = async () => {
  const res = await fetch("http://localhost:4000/logout", {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  setAccessToken("");
  window.location.reload();
};

export const NavBar: React.FC = () => {
  return (
    <Navbar className="mb-2" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand id="id1" href="/">
          <img src={logo} width="30" height="30" /> Constellations
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/dev">Dev</Nav.Link>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="/login">USER</a>
          </Navbar.Text> */}
          <Button variant="secondary" onClick={handleLogout}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
