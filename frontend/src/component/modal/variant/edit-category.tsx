import { Button, Form } from "react-bootstrap";
import { Category as CategoryType } from "../../../utility/type";
import { DeleteCategoryModal } from "./delete-category";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { useCategoryUpdateMutation } from "../../../generated/graphql";
import { useContext, useState } from "react";

interface EditCategoryModalProps {
  category: CategoryType;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
  setCategories,
}) => {
  const { hideModal, dispatchModal } = useContext(globalContext);

  const [name, setName] = useState<string>(category.name);
  const handleName = (e: any) => setName(e.target.value);

  const handleDelete = () =>
    dispatchModal(
      <DeleteCategoryModal category={category} setCategories={setCategories} />
    );

  const [updateMutation] = useCategoryUpdateMutation();
  const handleSave = () => {
    hideModal();
    updateMutation({
      variables: {
        categoryUpdateId: parseInt(category.id),
        name,
      },
    }).then((e) => {
      const category = e?.data?.categoryUpdate;
      if (!e.errors && category) {
        setCategories((state) =>
          state.map((e) => {
            if (e.id === category.id) {
              return {
                ...e,
                name: category.name,
              };
            }
            return e;
          })
        );
      }
    });
  };

  const handleClose = () => {
    hideModal();
    setName(category.name);
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
                value={name}
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
