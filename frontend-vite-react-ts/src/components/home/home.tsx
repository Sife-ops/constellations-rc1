import React from "react";
import { Badge, Button, Form, ToggleButton } from "react-bootstrap";
import { BookmarkType, CategoryType } from "../../utility/types";
import { Filter } from "./filter";
import { GlobalContext } from "../../utility/context";

interface HomeProps {
  bookmarks: BookmarkType[];
}

export const Home: React.FC<HomeProps> = ({ bookmarks }) => {
  const { hideModal, setModal } = React.useContext(GlobalContext);

  const [categories, setCategories] = React.useState<CategoryType[]>(
    reduceCategories(bookmarks)
  );

  // todo: "No Category" category is ANDed with others
  const selectedCategories = categories.filter((e) => e.selected);
  if (selectedCategories.length > 0) {
    bookmarks = bookmarks.filter((e) => {
      if (e.categories.length < 1) {
        e.categories = [categoryNone];
      }
      let matched = 0;
      for (let i1 = 0; i1 < e.categories.length; i1++) {
        for (let i2 = 0; i2 < selectedCategories.length; i2++) {
          if (selectedCategories[i2].id === e.categories[i1].id) {
            matched++;
          }
        }
      }
      if (matched === selectedCategories.length) {
        return true;
      }
      return false;
    });
  }

  const categoryClearButton = (
    <Button
      className="mb-2 me-2"
      variant="secondary"
      onClick={() => {
        setCategories(
          categories.map((e) => {
            return {
              ...e,
              selected: false,
            };
          })
        );
      }}
    >
      Reset
    </Button>
  );

  const categoryButtons = categories.map((e1) => (
    <ToggleButton
      className="mb-2 me-2"
      key={e1.id}
      type="checkbox"
      value="1"
      variant="outline-primary"
      checked={e1.selected}
      onClick={() => {
        setCategories(
          categories.map((e2) => {
            if (e2.id === e1.id) {
              return {
                ...e2,
                selected: !e2.selected,
              };
            }
            return e2;
          })
        );
      }}
    >
      {e1.name} <Badge>{e1.count}</Badge>
    </ToggleButton>
  ));

  // todo: add category input validation
  // todo: add category modal confirm onClick
  const categoryAddButton = (
    <Button
      className="mb-2 me-2"
      variant="success"
      onClick={() =>
        setModal({
          show: true,
          heading: "Add Category",
          body: (
            <Form>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control placeholder="New Category" />
              </Form.Group>
            </Form>
          ),
          footer: (
            <Button variant="success" onClick={() => hideModal()}>
              Confirm
            </Button>
          ),
        })
      }
    >
      Add Category
    </Button>
  );

  return (
    <div>
      {categoryClearButton}
      {categoryButtons}
      {categoryAddButton}

      <Filter bookmarks={bookmarks} />
    </div>
  );
};

const categoryNone: CategoryType = {
  id: "0",
  name: "No Category",
  count: 0,
  selected: false,
};

// todo: compute category count on backend
// todo: "No Category" category before others
const reduceCategories = (bookmarks: BookmarkType[]): CategoryType[] => {
  return bookmarks
    .reduce((previous: CategoryType[], current: BookmarkType) => {
      if (current.categories.length < 1) {
        return [...previous, categoryNone];
      }
      return [...previous, ...current.categories];
    }, [])
    .reduce((previous: CategoryType[], current: CategoryType) => {
      let found = false;
      const returns = previous.map((e) => {
        if (e.id === current.id) {
          found = true;
          return {
            ...e,
            count: e.count ? e.count + 1 : 1,
          };
        }
        return e;
      });
      if (found) {
        return returns;
      }
      return returns.concat({
        ...current,
        count: 1,
        selected: false,
      });
    }, []);
};
