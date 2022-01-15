import React from "react";
import { Button, Form } from "react-bootstrap";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";

export const AddCategoryModal: React.FC = () => {
  const { hideModal } = React.useContext(globalContext);

  const handleSubmit = () => hideModal();

  return (
    <ModalWindow
      heading="Add Category"
      body={
        <Form>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control placeholder="New Category" />
          </Form.Group>
        </Form>
      }
      footer={
        <Button variant="success" onClick={handleSubmit}>
          Confirm
        </Button>
      }
    />
  );
};
