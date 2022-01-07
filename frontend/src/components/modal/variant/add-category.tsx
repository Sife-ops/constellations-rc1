import React from "react";
import { Button, Form } from "react-bootstrap";
import { GlobalContext } from "../../../utility/context";

export const AddCategoryBody: React.FC = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Category Name</Form.Label>
        <Form.Control placeholder="New Category" />
      </Form.Group>
    </Form>
  );
};

export const AddCategoryFooter: React.FC = () => {
  const { hideModal } = React.useContext(GlobalContext);

  return (
    <Button variant="success" onClick={() => hideModal()}>
      Confirm
    </Button>
  );
};
