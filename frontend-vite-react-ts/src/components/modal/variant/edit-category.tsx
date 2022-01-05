import React from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../../utility/context";
import { ModalType, CategoryType } from "../../../utility/types";
import { DeleteCategoryBody, DeleteCategoryFooter } from "./delete-category";

interface AddCategoryBodyProps {
  category: CategoryType;
}

export const EditCategoryBody: React.FC<AddCategoryBodyProps> = ({
  category,
}) => {
  return <p>{category.name}</p>;
};

export const EditCategoryFooter: React.FC = () => {
  const { hideModal, setModal } = React.useContext(GlobalContext);

  const handleDelete = () =>
    setModal({
      heading: "Delete Category",
      body: <DeleteCategoryBody />,
      footer: <DeleteCategoryFooter />,
    } as ModalType);

  const handleSave = () => hideModal();

  return (
    <>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="success" onClick={handleSave}>
        Save
      </Button>
    </>
  );
};
