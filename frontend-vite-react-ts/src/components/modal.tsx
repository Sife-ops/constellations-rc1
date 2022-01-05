import React from "react";
import { Button, Modal } from "react-bootstrap";
import { GlobalContext } from "../utility/context";

export const ModalWindow: React.FC = () => {
  const {
    globalState: { modal },
    setGlobalState,
  } = React.useContext(GlobalContext);

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
              setGlobalState((state) => ({
                ...state,
                modal: {
                  show: false,
                },
              }))
            }
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
