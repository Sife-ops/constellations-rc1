import React from "react";
import { Button } from "react-bootstrap";
import { globalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

export const DeleteCategoryModal: React.FC = () => {
  const { hideModal } = React.useContext(globalContext);

  const handleSubmit = () => hideModal();

  return (
    <ModalWindow
      heading="Add Category"
      body={<p>Are you sure you want to delete this category?</p>}
      footer={
        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      }
    />
  );
};
