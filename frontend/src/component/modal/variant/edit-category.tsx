import { Button, Form } from "react-bootstrap";
import { CategoryType } from "../../../utility/type";
import { DeleteCategoryModal } from "./delete-category";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { useCategoryUpdateMutation } from "../../../generated/graphql";
import { useContext, useState } from "react";

interface EditCategoryModalProps {
  category: CategoryType;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
}) => {
  const { hideModal, dispatchModal } = useContext(globalContext);

  const [newName, setNewName] = useState<string>(category.name);

  const handleName = (e: any) => setNewName(e.target.value);

  const handleDelete = () =>
    dispatchModal(<DeleteCategoryModal category={category} />);

  const [updateMutation] = useCategoryUpdateMutation();
  const handleSave = () => {
    updateMutation({
      variables: {
        categoryUpdateId: parseInt(category.id),
        name: newName,
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
