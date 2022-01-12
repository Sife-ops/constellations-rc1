import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const NavBar: React.FC<{ logo: any }> = ({ logo }) => {
  return (
    <Navbar className="mb-2" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand id="id1" href="/">
          <img src={logo} width="30" height="30" /> Constellations
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/login">USER</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
