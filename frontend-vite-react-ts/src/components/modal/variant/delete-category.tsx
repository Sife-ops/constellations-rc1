import React from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../../utility/context";

export const DeleteCategoryBody: React.FC = () => {
  return <p>Are you sure you want to delete this category?</p>;
};

export const DeleteCategoryFooter: React.FC = () => {
  const { hideModal } = React.useContext(GlobalContext);

  return (
    <Button variant="danger" onClick={() => hideModal()}>
      Delete
    </Button>
  );
};
