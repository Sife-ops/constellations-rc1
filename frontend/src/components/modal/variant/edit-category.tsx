import React from "react";
import { Button } from "react-bootstrap";
import { CategoryType } from "../../../utility/types";
import { DeleteCategoryModal } from "./delete-category";
import { GlobalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

interface EditCategoryModalProps {
  category: CategoryType;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
}) => {
  const { hideModal, dispatchModal } = React.useContext(GlobalContext);

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
