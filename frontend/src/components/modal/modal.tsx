import React from "react";
import { Button, Modal } from "react-bootstrap";
import { GlobalContext } from "../../utility/context";

export const ModalWindow: React.FC = () => {
  const {
    globalState: { modal },
    hideModal,
  } = React.useContext(GlobalContext);

  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modal.show}
        size="lg"
      >
        {/* todo: customize modal closeButton */}
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {modal.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.body}</Modal.Body>
        <Modal.Footer>
          {modal.footer}
          <Button variant="secondary" onClick={() => hideModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
