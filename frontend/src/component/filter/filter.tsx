import React from "react";
import { AddBookmarkModal } from "../modal/variant/add-bookmark";
import { BookmarkType, CategoryType } from "../../utility/type";
import { Button } from "react-bootstrap";
import { Category } from "./category";
import { FilterTable } from "./table";
import { Search } from "./search";
import { globalContext } from "../../utility/context";
import { reduceCategories } from "../../utility/function";

interface Props {
  bookmarks: BookmarkType[];
}

export const Filter: React.FC<Props> = ({ bookmarks }) => {
  const { dispatchModal } = React.useContext(globalContext);

  const [categories, setCategories] = React.useState<CategoryType[]>(
    reduceCategories(bookmarks)
  );

  const [search, setSearch] = React.useState<string>("");

  const handleAddBookmark = () =>
    dispatchModal(<AddBookmarkModal categories={categories} />);

  return (
    <div>
      <Category
        //
        categories={categories}
        setCategories={setCategories}
      />

      <Search setSearch={setSearch} />

      <div className="d-grid gap-2">
        <Button variant="success" onClick={handleAddBookmark}>
          Add Bookmark
        </Button>
      </div>

      <FilterTable
        bookmarks={bookmarks}
        categories={categories}
        search={search}
      />
    </div>
  );
};
