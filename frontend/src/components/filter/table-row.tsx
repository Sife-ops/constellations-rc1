import React from "react";
import { Badge } from "react-bootstrap";
import { BookmarkType, CategoryType } from "../../utility/type";
import { DeleteBookmarkModal } from "../modal/variant/delete-bookmark";
import { EditBookmarkModal } from "../modal/variant/edit-bookmark";
import { globalContext } from "../../utility/context";

interface Props {
  bookmark: BookmarkType;
}

// todo: hide cog/trash until hover row
// todo: ellipsize long links
// todo: action column less wide
export const FilterTableRow: React.FC<Props> = ({ bookmark }) => {
  const { dispatchModal } = React.useContext(globalContext);

  const [hover, setHover] = React.useState<boolean>(false);

  const handleEdit = () =>
    dispatchModal(<EditBookmarkModal bookmark={bookmark} />);

  const handleDelete = () =>
    dispatchModal(<DeleteBookmarkModal bookmark={bookmark} />);

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
      <td>{bookmark.categories.map(mapCategoryBadge)}</td>
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

const mapCategoryBadge = (e: CategoryType) => {
  if (e.id !== "0") {
    return (
      <Badge bg="primary" className="me-2" key={e.id} pill>
        {e.name}
      </Badge>
    );
  }
  return null;
};
