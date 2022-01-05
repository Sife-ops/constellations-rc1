import React from "react";
import { BookmarkType } from "../../utility/types";
import { Button, Form, FormControl } from "react-bootstrap";
import { FilterTable } from "./filter-table";
import { GlobalContext } from "../../utility/context";

interface FilterProps {
  bookmarks: BookmarkType[];
}

export const Filter: React.FC<FilterProps> = ({ bookmarks }) => {
  const { setModal, hideModal } = React.useContext(GlobalContext);

  const [filter, setFilter] = React.useState<string>("");

  // todo: filter on description and url text
  const filtered: BookmarkType[] = bookmarks.filter((e) => {
    if (filter === "") {
      return e;
    }
    return e.description.includes(filter);
  });

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
        <Button
          variant="success"
          onClick={() =>
            setModal({
              show: true,
              heading: "Add Bookmark",
              body: (
                <Form>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="Krusty Krab" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control placeholder="https://krustykrab.com" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                      <option>No Category</option>
                      <option>option1</option>
                      <option>option2</option>
                    </Form.Select>
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
          Add Bookmark
        </Button>
      </div>

      <FilterTable bookmarks={filtered} />
    </div>
  );
};
