import React from "react";
import { Badge, Button } from "react-bootstrap";
import { BookmarkType, CategoryType } from "../../utility/types";
import { GlobalContext } from "../../utility/context";

interface FilterTableRowProps {
  bookmark: BookmarkType;
}

// todo: hide cog/trash until hover row
// todo: ellipsize long links
// todo: action column less wide
export const FilterTableRow: React.FC<FilterTableRowProps> = ({ bookmark }) => {
  const { setModal, hideModal } = React.useContext(GlobalContext);

  const [hover, setHover] = React.useState<boolean>(false);

  const handleEdit = () =>
    setModal({
      show: true,
      heading: "Edit Bookmark",
      body: <div>{bookmark.description}</div>,
      footer: (
        <Button variant="success" onClick={() => hideModal()}>
          Confirm
        </Button>
      ),
    });

  const handleDelete = () =>
    setModal({
      show: true,
      heading: "Delete Bookmark",
      body: <p>Are you sure?</p>,
      footer: (
        <Button variant="danger" onClick={() => hideModal()}>
          Confirm
        </Button>
      ),
    });

  return (
    <tr
      key={bookmark.id}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <td>{bookmark.description}</td>
      <td>
        <a href={bookmark.url} target="_blank">
          {bookmark.url}
        </a>
      </td>
      <td>{bookmark.categories.map(mapCategory)}</td>
      <td align="right">
        <i
          className={
            "fas fa-cog me-2 " +
            (hover ? "bookmarkRow__edit--hover" : "bookmarkRow__edit")
          }
          onClick={handleEdit}
        />
        <i
          className={
            "fas fa-trash " +
            (hover ? "bookmarkRow__delete--hover" : "bookmarkRow__delete")
          }
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
};

const mapCategory = (e: CategoryType) => {
  if (e.id !== "0") {
    return (
      <Badge bg="primary" className="me-2" key={e.id} pill>
        {e.name}
      </Badge>
    );
  }
  return null;
};
