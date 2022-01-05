import React from "react";
import { Badge, Table } from "react-bootstrap";
import { BookmarkType } from "../../utility/types";

interface FilterTableProps {
  bookmarks: BookmarkType[];
}

export const FilterTable: React.FC<FilterTableProps> = ({ bookmarks }) => {
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
