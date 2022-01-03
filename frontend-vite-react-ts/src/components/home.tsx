import React from "react";
import {
  Badge,
  Button,
  FormControl,
  Table,
  ToggleButton,
} from "react-bootstrap";

import { Bookmark, Category } from "../utility/types";

interface Props {
  bookmarks: Bookmark[];
}

export const Home: React.FC<Props> = ({ bookmarks }) => {
  const [categories, setCategories] = React.useState<Category[]>(
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

  // todo: onClick
  const categoryAddButton = (
    <Button className="mb-2 me-2" variant="success">
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

const Filter: React.FC<Props> = ({ bookmarks }) => {
  const [filter, setFilter] = React.useState<string>("");

  // todo: filter on description and url text
  const filtered: Bookmark[] = bookmarks.filter((e) => {
    if (filter === "") {
      return e;
    }
    return e.description.includes(filter);
  });

  // todo: filter criteria dropdown button
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
        <Button variant="success">Add Bookmark</Button>
      </div>
      <FilterTable bookmarks={filtered} />
    </div>
  );
};

const FilterTable: React.FC<Props> = ({ bookmarks }) => {
  const rows = bookmarks.map((e) => (
    <tr key={e.id}>
      <td>{e.description}</td>
      <td>
        <a href={e.url} target="_blank">
          {e.url}
        </a>
      </td>
      <td>
        {e.categories.map((e) => {
          if (e.id !== "0") {
            return (
              <Badge bg="primary" className="me-2" key={e.id} pill>
                {e.name}
              </Badge>
            );
          }
          return null;
        })}
      </td>
    </tr>
  ));

  return (
    <Table>
      {/* <thead>
        <tr>
          <th>Description</th>
          <th>URL</th>
          <th>Categories</th>
        </tr>
      </thead> */}
      <tbody>{rows}</tbody>
    </Table>
  );
};

const categoryNone: Category = {
  id: "0",
  name: "No Category",
  count: 0,
  selected: false,
};

// todo: compute category count on backend
// todo: "No Category" category before others
const reduceCategories = (bookmarks: Bookmark[]): Category[] => {
  return bookmarks
    .reduce((previous: Category[], current: Bookmark) => {
      if (current.categories.length < 1) {
        return [...previous, categoryNone];
      }
      return [...previous, ...current.categories];
    }, [])
    .reduce((previous: Category[], current: Category) => {
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
