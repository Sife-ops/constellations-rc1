import React from "react";
import { Button, Form } from "react-bootstrap";
import { CategoryType, CategoryUpdateRequest } from "../../../utility/type";
import { DeleteCategoryModal } from "./delete-category";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { typedMutation } from "../../../utility/function";
import { updateCategory } from "../../../utility/request";
import { useMutation } from "urql";

interface EditCategoryModalProps {
  category: CategoryType;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
}) => {
  const { hideModal, dispatchModal } = React.useContext(globalContext);

  const [newName, setNewName] = React.useState<string>(category.name);

  const [mutationRes, mutation] = useMutation(updateCategory);

  const handleName = (e: any) => setNewName(e.target.value);

  const handleDelete = () =>
    dispatchModal(<DeleteCategoryModal category={category} />);

  const handleSave = () => {
    typedMutation<CategoryUpdateRequest>(mutation, {
      id: parseInt(category.id),
      name: newName,
    });
    handleClose();
  };

  const handleClose = () => {
    dispatchModal(<></>);
    hideModal();
  };

  return (
    <ModalWindow
      heading="Edit Category"
      body={
        <div>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                // todo: fill with current name
                value={newName}
                onChange={handleName}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <div className="d-grid gap-2">
                <Button variant="danger" onClick={handleDelete}>
                  Delete Category
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      }
      footer={
        <>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </>
      }
    />
  );
};