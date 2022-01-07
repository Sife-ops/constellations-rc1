import React from "react";
import { AddBookmarkModal } from "../modal/variant/add-bookmark";
import { BookmarkType } from "../../utility/types";
import { Button, FormControl } from "react-bootstrap";
import { FilterTable } from "./filter-table";
import { GlobalContext } from "../../utility/context";

interface FilterProps {
  bookmarks: BookmarkType[];
}

export const Filter: React.FC<FilterProps> = ({ bookmarks }) => {
  const { dispatchModal } = React.useContext(GlobalContext);

  const [filter, setFilter] = React.useState<string>("");

  // todo: filter on description and url text
  const filtered: BookmarkType[] = bookmarks.filter((e) => {
    if (filter === "") {
      return e;
    }
    return e.description.toLowerCase().includes(filter.toLowerCase());
  });

  const handleAddBookmark = () => dispatchModal(<AddBookmarkModal />);

  // todo: add bookmark modal input validation
  // todo: add bookmark modal confirm onClick
  // todo: add bookmark modal populate select options
  return (
    <div>
      <FormControl
        className="mb-2"
        type="search"
        placeholder="Filter"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />

      <div className="d-grid gap-2">
        <Button variant="success" onClick={handleAddBookmark}>
          Add Bookmark
        </Button>
      </div>

      <FilterTable bookmarks={filtered} />
    </div>
  );
};
