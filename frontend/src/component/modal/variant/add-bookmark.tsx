import React from "react";
import { Button, Form, ToggleButton } from "react-bootstrap";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";

import {
  BookmarkAddForm,
  Category as CategoryType,
} from "../../../utility/type";

interface Props {
  categories: CategoryType[];
}

export const AddBookmarkModal: React.FC<Props> = ({ categories }) => {
  const { hideModal } = React.useContext(globalContext);

  const initialForm: BookmarkAddForm = {
    url: "",
    description: "",
    categoryIds: [],
  };

  const [form, setForm] = React.useState<BookmarkAddForm>(initialForm);

  const initialCategories = categories.reduce(
    // remove 'no category'
    (previous: CategoryType[], current: CategoryType): CategoryType[] => {
      if (current.id === "0") {
        return previous;
      }
      return previous.concat({
        ...current,
        selected: false,
      });
    },
    []
  );

  const [addCategories, setAddCategories] =
    React.useState<CategoryType[]>(initialCategories);

  const handleDescription = (e: any) => {
    setForm((form) => ({
      ...form,
      description: e.target.value,
    }));
  };

  const handleUrl = (e: any) => {
    setForm((form) => ({
      ...form,
      url: e.target.value,
    }));
  };

  const mapCategoryButtons = (e1: CategoryType) => (
    <ToggleButton
      className="mb-2 me-2"
      key={e1.id}
      type="checkbox"
      value="1"
      variant="outline-primary"
      checked={e1.selected}
      onClick={() => {
        setAddCategories((current) =>
          current.map((e2) => {
            if (e2.id === e1.id) {
              return { ...e2, selected: !e2.selected };
            }
            return e2;
          })
        );
      }}
    >
      {e1.name}
    </ToggleButton>
  );

  const handleSubmit = () => {
    handleClose();
  };

  const handleClose = () => {
    setAddCategories(initialCategories);
    setForm(initialForm);
    hideModal();
  };

  return (
    <ModalWindow
      heading="Add Bookmark"
      body={
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Krusty Krab"
              onChange={handleDescription}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>URL</Form.Label>
            <Form.Control
              placeholder="https://krustykrab.com"
              onChange={handleUrl}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <div>{addCategories.map(mapCategoryButtons)}</div>
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
