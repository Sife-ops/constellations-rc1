import React from "react";
import { BookmarkType } from "../../utility/types";
import { FilterTableRow } from "./filter-table-row";
import { Table } from "react-bootstrap";

interface FilterTableProps {
  bookmarks: BookmarkType[];
}

export const FilterTable: React.FC<FilterTableProps> = ({ bookmarks }) => {
  const rows = bookmarks.map((e) => <FilterTableRow key={e.id} bookmark={e} />);

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
