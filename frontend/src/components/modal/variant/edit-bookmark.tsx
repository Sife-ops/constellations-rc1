import React from "react";
import { Button, Form, ToggleButton } from "react-bootstrap";
import { useMutation } from "urql";
import { globalContext } from "../../../utility/context";
import { updateBookmark } from "../../../utility/request";
import {
  BookmarkType,
  CategoryType,
  BookmarkUpdateOptions,
} from "../../../utility/type";
import { ModalWindow } from "../modal";

interface Props {
  bookmark: BookmarkType;
  categories: CategoryType[];
}

export const EditBookmarkModal: React.FC<Props> = ({
  bookmark,
  categories,
}) => {
  const { hideModal, dispatchModal } = React.useContext(globalContext);

  const initialForm: BookmarkUpdateOptions = {
    url: bookmark.url,
    description: bookmark.description,
    categoryIds: [],
  };

  const [form, setForm] = React.useState<BookmarkUpdateOptions>(initialForm);

  const initialNewCategories: CategoryType[] = categories.reduce(
    // removes 'no category'
    // merges current categories with all categories
    (previous: CategoryType[], current: CategoryType): CategoryType[] => {
      if (current.id === "0") {
        return previous;
      }
      if (bookmark.categories.find((e) => e.id === current.id)) {
        return previous.concat({
          ...current,
          selected: true,
        });
      }
      return previous.concat({
        ...current,
        selected: false,
      });
    },
    []
  );

  const [newCategories, setNewCategories] =
    React.useState<CategoryType[]>(initialNewCategories);

  const [mutationRes, mutation] = useMutation(updateBookmark);

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
        setNewCategories((current) =>
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
    mutation({
      id: parseInt(bookmark.id),
      options: {
        ...form,
        categoryIds: newCategories.reduce(
          (previous: number[], current: CategoryType): number[] => {
            if (current.selected) {
              return [...previous, parseInt(current.id)];
            }
            return previous;
          },
          []
        ),
      },
    }).then((res) => console.log(res));
    handleClose();
  };

  const handleClose = () => {
    // todo: hide modal unmounts component
    // todo: disable modal animations
    dispatchModal(<></>);
    hideModal();
  };

  return (
    <ModalWindow
      heading="Edit Bookmark"
      body={
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={form.description}
              onChange={handleDescription}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>URL</Form.Label>
            <Form.Control value={form.url} onChange={handleUrl} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <div>{newCategories.map(mapCategoryButtons)}</div>
          </Form.Group>
        </Form>
      }
      footer={
        <>
          <Button variant="success" onClick={handleSubmit}>
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
