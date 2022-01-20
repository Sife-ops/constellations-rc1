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
  const { hideModal } = React.useContext(globalContext);

  const [name, setName] = React.useState<string>("");
  const handleName = (e: any) => setName(e.target.value);

  const [mutation] = useCategoryCreateMutation();
  const handleSubmit = () => {
    hideModal();
    mutation({
      variables: {
        name,
      },
    }).then((e) => {
      const category = e?.data?.categoryCreate;
      if (!e.errors && category) {
        setCategories((state) => [...state, category]);
      }
    });
  };

  const handleClose = () => {
    hideModal();
    setName("");
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
