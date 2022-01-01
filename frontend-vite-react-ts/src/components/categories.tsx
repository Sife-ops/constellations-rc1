import React from "react";
import { Badge, ToggleButton } from "react-bootstrap";

import { Bookmark, Category } from "../utility/types";

export const Categories: React.FC<{ bookmarks: Bookmark[] }> = ({ bookmarks }) => {
  const categories: Category[] = bookmarks
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

  return <div>{categoryButtons}</div>;
};
