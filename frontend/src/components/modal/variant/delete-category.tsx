import React from "react";
import { Button } from "react-bootstrap";
import { globalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

export const DeleteCategoryModal: React.FC = () => {
  const { hideModal } = React.useContext(globalContext);

  // todo: delete category mutation

  const handleConfirm = () => {
    handleClose();
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
      footer={<> </>}
    />
  );
};
