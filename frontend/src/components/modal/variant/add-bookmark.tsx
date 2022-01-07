import React from "react";
import { Button, Form } from "react-bootstrap";
import { GlobalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

export const AddBookmarkModal: React.FC = () => {
  const { hideModal } = React.useContext(GlobalContext);

  return (
    <ModalWindow
      heading="Add Bookmark"
      body={
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Krusty Krab" />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control placeholder="https://krustykrab.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option>No Category</option>
              <option>option1</option>
              <option>option2</option>
            </Form.Select>
          </Form.Group>
        </Form>
      }
      footer={
        <Button variant="success" onClick={() => hideModal()}>
          Confirm
        </Button>
      }
    />
  );
};
