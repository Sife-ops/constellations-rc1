import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { BookmarkType } from "../../utility/types";
import { GlobalContext } from "../../utility/context";

interface FilterTableProps {
  bookmarks: BookmarkType[];
}

// todo: hide cog/trash until hover row
// todo: ellipsize long links
// todo: action column less wide
export const FilterTable: React.FC<FilterTableProps> = ({ bookmarks }) => {
  const { setModal, hideModal } = React.useContext(GlobalContext);

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
      <td align="right">
        <i
          className="fas fa-cog me-2"
          onClick={() =>
            setModal({
              show: true,
              heading: "Edit Bookmark",
              body: <div>{e.description}</div>,
              footer: (
                <Button variant="success" onClick={() => hideModal()}>
                  Confirm
                </Button>
              ),
            })
          }
        />
        <i
          className="fas fa-trash"
          onClick={() =>
            setModal({
              show: true,
              heading: "Delete Bookmark",
              body: <p>Are you sure?</p>,
              footer: (
                <Button variant="danger" onClick={() => hideModal()}>
                  Confirm
                </Button>
              ),
            })
          }
        />
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
