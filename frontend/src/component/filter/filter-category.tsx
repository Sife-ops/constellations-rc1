import React from "react";
import { AddCategoryModal } from "../modal/variant/add-category";
import { Badge, Button, ToggleButton } from "react-bootstrap";
import { Category as CategoryType } from "../../utility/type";
import { EditCategoryModal } from "../modal/variant/edit-category";
import { globalContext } from "../../utility/context";

interface Props {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

export const FilterCategory: React.FC<Props> = ({ categories, setCategories }) => {
  const { dispatchModal } = React.useContext(globalContext);

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const handleClearCategory = () =>
    setCategories((current) =>
      current.map((e) => ({
        ...e,
        selected: false,
      }))
    );

  const mapCategoryButtons = (e1: CategoryType) => {
    const handleSelectCategory = () => {
      if (editMode) {
        dispatchModal(<EditCategoryModal category={e1} />);
        return;
      }
      setCategories((current) =>
        current.map((e2) => {
          if (e2.id === e1.id) {
            return { ...e2, selected: !e2.selected };
          }
          return e2;
        })
      );
    };

    if (e1.id === "0" && editMode) return null;

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
        {editMode ? (
          <i className="fas fa-cog" />
        ) : (
          <>{e1.bookmarks ? <Badge>{e1.bookmarks.length}</Badge> : null}</>
        )}
      </ToggleButton>
    );
  };

  const handleCategoryEdit = () => setEditMode(true);

  const handleAddCategory = () => dispatchModal(<AddCategoryModal />);

  const handleCategoryEditDone = () => setEditMode(false);

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

      {editMode ? (
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
    </div>
  );
};
