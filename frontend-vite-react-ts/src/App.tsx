// todo: favicon
// todo: handle empty bookmarks
// todo: category colors
// todo: edit/delete bookmarks
// todo: edit/delete categories
// todo: donate tab

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import logo from "./logo.svg";
import userData from "./mock-data/user.json";
import { About } from "./components/about";
import { Button, Container, Modal, Nav, Navbar } from "react-bootstrap";
import { Home } from "./components/home";
import { Routes, Route } from "react-router-dom";
import { ModalState } from "./utility/types";

function App() {
  const [modal, setModal] = React.useState<ModalState>({ show: false });

  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modal.show}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modal.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.body}</Modal.Body>
        <Modal.Footer>
          {modal.footer}
          <Button
            variant="secondary"
            onClick={() =>
              setModal({
                show: false,
              })
            }
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

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
            element={
              <Home
                bookmarks={userData.data.user.bookmarks}
                setModal={setModal}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
