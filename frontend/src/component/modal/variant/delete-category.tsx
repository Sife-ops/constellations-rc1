import React from "react";
import { Button } from "react-bootstrap";
import { Category as CategoryType } from "../../../utility/type";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { useCategoryDeleteMutation } from "../../../generated/graphql";

interface Props {
  category: CategoryType;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

export const DeleteCategoryModal: React.FC<Props> = ({
  category,
  setCategories,
}) => {
  const { hideModal } = React.useContext(globalContext);

  const [deleteMutation] = useCategoryDeleteMutation();
  const handleConfirm = () => {
    hideModal();
    deleteMutation({
      variables: {
        categoryDeleteId: parseInt(category.id),
      },
    }).then((e) => {
      if (!e.errors) {
        setCategories((state) => state.filter((e) => e.id !== category.id));
      }
    });
  };

  const handleClose = () => hideModal();

  return (
    <ModalWindow
      heading="Add Category"
      body={
        <>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this category? This cannot be
            undone.
          </p>
          <div className="d-grid gap-2 mb-2">
            <Button variant="danger" onClick={handleConfirm}>
              Yes, I'm sure.
            </Button>
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleClose}>
              No, take me back!
            </Button>
          </div>
        </>
      }
      footer={<></>}
    />
  );
};
