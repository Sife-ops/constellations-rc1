import React from "react";
import { AddBookmarkModal } from "../modal/variant/add-bookmark";
import { BookmarkType, CategoryType } from "../../utility/type";
import { Button } from "react-bootstrap";
import { Category } from "./category";
import { FilterTable } from "./table";
import { GlobalContext } from "../../utility/context";
import { Search } from "./search";
import { reduceCategories } from "../../utility/function";

interface Props {
  bookmarks: BookmarkType[];
}

export const Filter: React.FC<Props> = ({ bookmarks }) => {
  const { dispatchModal } = React.useContext(GlobalContext);
  const handleAddBookmark = () => dispatchModal(<AddBookmarkModal />);

  const [categories, setCategories] = React.useState<CategoryType[]>(
    reduceCategories(bookmarks)
  );

  const [search, setSearch] = React.useState<string>("");

  return (
    <>
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
    </>
  );
};
