import React from "react";
import { Button } from "react-bootstrap";
import { CategoryType } from "../../../utility/type";
import { DeleteCategoryModal } from "./delete-category";
import { globalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

interface EditCategoryModalProps {
  category: CategoryType;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
}) => {
  const { hideModal, dispatchModal } = React.useContext(globalContext);

  const handleSave = () => hideModal();

  const handleDelete = () => dispatchModal(<DeleteCategoryModal />);

  return (
    <ModalWindow
      heading="Edit Category"
      body={<p>{category.name}</p>}
      footer={
        <>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </>
      }
    />
  );
};
