import React from "react";
import { Button, Form } from "react-bootstrap";
import { Category as CategoryType } from "../../../utility/type";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { useCategoryCreateMutation } from "../../../generated/graphql";

interface Props {
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

export const AddCategoryModal: React.FC<Props> = ({ setCategories }) => {
  const { hideModal, dispatchModal } = React.useContext(globalContext);

  const [name, setName] = React.useState<string>("");
  const handleName = (e: any) => setName(e.target.value);

  const [mutation] = useCategoryCreateMutation();
  const handleSubmit = () => {
    hideModal();
    mutation({
      variables: {
        name,
      },
    }).then(() => {
      dispatchModal(<></>);
      window.location.reload();
    });
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
