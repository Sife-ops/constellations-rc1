import React from "react";
import { FilterTableRow } from "./table-row";
import { Table } from "react-bootstrap";
import { categoryNone } from "../../utility/function";

import {
  Bookmark as BookmarkType,
  Category as CategoryType,
} from "../../utility/type";

interface Props {
  bookmarks: BookmarkType[];
  categories: CategoryType[];
  search: string;
}

export const FilterTable: React.FC<Props> = ({
  bookmarks,
  categories,
  search,
}) => {
  // todo: "No Category" category is ANDed with others
  let filtered: BookmarkType[] = bookmarks;
  const selectedCategories = categories.filter((e) => e.selected);

  if (selectedCategories.length > 0) {
    filtered = bookmarks.filter((e) => {
      if (!e.categories) {
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

  if (search !== "") {
    filtered = filtered.filter((e) =>
      e.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Table>
      <tbody>
        {filtered.map((e) => (
          <FilterTableRow key={e.id} bookmark={e} categories={categories} />
        ))}
      </tbody>
    </Table>
  );
};
