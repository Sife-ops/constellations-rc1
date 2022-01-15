import React from "react";
import { Button, Modal } from "react-bootstrap";
import { globalContext } from "../../utility/context";

interface ModalWindowProps {
  heading: string;
  body: JSX.Element;
  footer: JSX.Element;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  heading,
  body,
  footer,
}) => {
  const {
    globalState: { modal },
    hideModal,
  } = React.useContext(globalContext);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modal.show}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};
