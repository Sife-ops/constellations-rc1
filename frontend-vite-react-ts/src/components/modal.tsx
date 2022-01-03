import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ModalState } from "../utility/types";

interface Props {
  modalState: [
    //
    ModalState,
    React.Dispatch<React.SetStateAction<ModalState>>
  ];
}

export const ModalWindow: React.FC<Props> = ({
  modalState: [modal, setModal],
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modal.show}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modal.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.body}</Modal.Body>
        <Modal.Footer>
          {modal.footer}
          <Button
            variant="secondary"
            onClick={() =>
              setModal({
                show: false,
              })
            }
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
