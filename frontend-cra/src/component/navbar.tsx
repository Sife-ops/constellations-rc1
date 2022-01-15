import React from "react";
import logo from "../logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Dev } from "./dev";

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
          <Navbar.Text>
            {/* todo: logout button */}
            Signed in as: <a href="/login">USER</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
