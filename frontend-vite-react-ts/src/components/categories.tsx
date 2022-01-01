import React from "react";
import { Badge, ToggleButton } from "react-bootstrap";
import { Bookmark, Category } from "../utility/types";

interface Props {
  bookmarks: Bookmark[];
}

export const Categories: React.FC<Props> = ({ bookmarks }) => {
  // todo: add category button
  // todo: handle empty bookmarks
  // todo: clear button
  const categories: Category[] = reduceBookmarks(bookmarks);

  // todo: filter on click
  const categoryButtons = categories.map((e) => (
    <ToggleButton
      // checked={checked}
      // onChange={(e) => setChecked(e.currentTarget.checked)}
      checked={false}
      className="mb-2 mx-1"
      id="toggle-check"
      key={e.id}
      type="checkbox"
      value="1"
      variant="outline-primary"
    >
      {e.name} <Badge>{e.count}</Badge>
    </ToggleButton>
  ));

  return <div className="mt-2 mx-1">{categoryButtons}</div>;
};

// todo: compute user bookmark count on backend
const reduceBookmarks = (bookmarks: Bookmark[]): Category[] => {
  return bookmarks
    .reduce((previous: Category[], current: Bookmark) => {
      return [...previous, ...current.categories];
    }, [])
    .reduce((previous: Category[], current: Category) => {
      const found = previous.find((e) => e.name === current.name);
      if (found) {
        return previous
          .filter((e) => e.name !== found.name)
          .concat({
            ...found,
            count: found.count ? found.count + 1 : 1,
          });
      }
      return previous.concat({ ...current, count: 1 });
    }, []);
};
