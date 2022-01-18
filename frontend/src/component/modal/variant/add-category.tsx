import React from "react";
import { Button, Form } from "react-bootstrap";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { useCategoryCreateMutation } from "../../../generated/graphql";

export const AddCategoryModal: React.FC = () => {
  const { hideModal, dispatchModal } = React.useContext(globalContext);

  const [name, setName] = React.useState<string>("");
  const handleName = (e: any) => setName(e.target.value);

  const [mutation] = useCategoryCreateMutation();
  const handleSubmit = () => {
    mutation({
      variables: {
        name,
      },
    }).then((e) => {
      console.log(e.data);
    });
    handleClose();
  };

  const handleClose = () => {
    dispatchModal(<></>);
    hideModal();
  };

  return (
    <ModalWindow
      heading="Add Category"
      body={
        <Form>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              placeholder="New Category"
              value={name}
              onChange={handleName}
            />
          </Form.Group>
        </Form>
      }
      footer={
        <>
          <Button variant="success" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </>
      }
    />
  );
};
