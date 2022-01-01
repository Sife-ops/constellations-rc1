import React from "react";
import { Badge, Form, FormControl, Table, ToggleButton } from "react-bootstrap";
import { Bookmark, Category } from "../utility/types";

export const Home: React.FC<{ bookmarks: Bookmark[] }> = ({ bookmarks }) => {
  const [categories, setCategories] = React.useState<Category[]>(
    reduceBookmarks(bookmarks).map((e) => ({
      ...e,
      selected: false,
    }))
  );

  const selectedCategories = categories.filter((e) => e.selected);
  const filteredBookmarks =
    selectedCategories.length < 1
      ? bookmarks
      : bookmarks.reduce((previous: Bookmark[], current: Bookmark) => {
          for (let i = 0; i < current.categories.length; i++) {
            for (let j = 0; j < selectedCategories.length; j++) {
              if (selectedCategories[j].id === current.categories[i].id) {
                return [...previous, current];
              }
            }
          }
          return previous;
        }, []);

  const categoryButtons = categories.map((e) => (
    <ToggleButton
      className="mb-2 mx-1"
      key={e.id}
      type="checkbox"
      value="1"
      variant="outline-primary"
      checked={e.selected}
      onClick={() => {
        setCategories(
          categories.map((f) => {
            if (f.id === e.id) {
              return {
                ...f,
                selected: !f.selected,
              };
            }
            return f;
          })
        );
      }}
    >
      {e.name} <Badge>{e.count}</Badge>
    </ToggleButton>
  ));

  return (
    <div>
      <div className="mt-2 mx-1">{categoryButtons}</div>
      <Filter bookmarks={filteredBookmarks} />
    </div>
  );
};

const Filter: React.FC<{ bookmarks: Bookmark[] }> = ({ bookmarks }) => {
  const [filter, setFilter] = React.useState<string>("");

  const filtered: Bookmark[] = bookmarks.filter((e) => {
    if (filter === "") {
      return e;
    }
    return e.description.includes(filter);
  });

  return (
    <div>
      <Form className="d-flex mb-1 mx-1">
        <FormControl
          className="mx-1"
          type="search"
          placeholder="Filter"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        {/* <Button className="mx-1">Search</Button> */}
      </Form>

      <FilterTable bookmarks={filtered} />
    </div>
  );
};

const FilterTable: React.FC<{ bookmarks: Bookmark[] }> = ({ bookmarks }) => {
  const rows = bookmarks.map((e) => (
    <tr key={e.id}>
      <td>{e.description}</td>
      <td>{e.url}</td>
      <td>
        {e.categories.map((e) => (
          <Badge key={e.id} pill bg="primary">
            {e.name}
          </Badge>
        ))}
      </td>
    </tr>
  ));

  return (
    <Table striped className="mt-1">
      <thead>
        <tr>
          <th>Description</th>
          <th>URL</th>
          <th>Categories</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

const reduceBookmarks = (bookmarks: Bookmark[]): Category[] => {
  return bookmarks
    .reduce((previous: Category[], current: Bookmark) => {
      return [...previous, ...current.categories];
    }, [])
    .reduce((previous: Category[], current: Category) => {
      // todo: use map
      const found = previous.find((e) => e.name === current.name);
      if (found) {
        return previous
          .filter((e) => e.name !== found.name)
          .concat({
            ...found,
            count: found.count ? found.count + 1 : 1,
          });
      }
      return previous.concat({
        ...current,
        count: 1,
      });
    }, []);
};
