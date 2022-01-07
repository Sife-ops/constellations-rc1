import React from "react";
import { AddCategoryModal } from "../modal/variant/add-category";
import { Badge, Button, ToggleButton } from "react-bootstrap";
import { BookmarkType, CategoryType } from "../../utility/types";
import { EditCategoryModal } from "../modal/variant/edit-category";
import { Filter } from "./filter";
import { GlobalContext } from "../../utility/context";

interface HomeProps {
  bookmarks: BookmarkType[];
}

export const Home: React.FC<HomeProps> = ({ bookmarks }) => {
  const { dispatchModal } = React.useContext(GlobalContext);

  const [categories, setCategories] = React.useState<CategoryType[]>(
    reduceCategories(bookmarks)
  );
  const [categoryEdit, setCategoryEdit] = React.useState<boolean>(false);

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

  const handleClearCategory = () =>
    setCategories(
      categories.map((e) => {
        return { ...e, selected: false };
      })
    );

  const mapCategoryButtons = (e1: CategoryType) => {
    const handleSelectCategory = () => {
      if (categoryEdit) {
        dispatchModal(<EditCategoryModal category={e1} />);
        return;
      }
      setCategories(
        categories.map((e2) => {
          if (e2.id === e1.id) {
            return { ...e2, selected: !e2.selected };
          }
          return e2;
        })
      );
    };

    return (
      <ToggleButton
        className="mb-2 me-2"
        key={e1.id}
        type="checkbox"
        value="1"
        variant="outline-primary"
        checked={e1.selected}
        onClick={handleSelectCategory}
      >
        {e1.name}{" "}
        {categoryEdit ? (
          //
          <i className="fas fa-cog" />
        ) : (
          <Badge>{e1.count}</Badge>
        )}
      </ToggleButton>
    );
  };

  const handleCategoryEdit = () => setCategoryEdit(true);

  const handleAddCategory = () => dispatchModal(<AddCategoryModal />);

  const handleCategoryEditDone = () => setCategoryEdit(false);

  return (
    <div>
      <Button
        className="mb-2 me-2"
        variant="secondary"
        onClick={handleClearCategory}
      >
        Reset
      </Button>

      {categories.map(mapCategoryButtons)}

      {categoryEdit ? (
        <>
          <Button
            //
            className="mb-2 me-2"
            variant="success"
            onClick={handleAddCategory}
          >
            {/* todo: use plus sign */}
            Add
          </Button>

          <Button
            className="mb-2 me-2"
            variant="primary"
            onClick={handleCategoryEditDone}
          >
            {/* todo: use checkmark */}
            Done
          </Button>
        </>
      ) : (
        // todo: category input validation
        <Button
          className="mb-2 me-2"
          variant="secondary"
          onClick={handleCategoryEdit}
        >
          <i className="fas fa-cog" />
        </Button>
      )}

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
          return { ...e, count: e.count ? e.count + 1 : 1 };
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
