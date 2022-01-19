import React from "react";
import { Badge } from "react-bootstrap";
import { DeleteBookmarkModal } from "../modal/variant/delete-bookmark";
import { EditBookmarkModal } from "../modal/variant/edit-bookmark";
import { globalContext } from "../../utility/context";

import {
  Bookmark as BookmarkType,
  Category as CategoryType,
} from "../../utility/type";

interface Props {
  bookmark: BookmarkType;
  categories: CategoryType[];
}

export const FilterTableRow: React.FC<Props> = ({ bookmark, categories }) => {
  const { dispatchModal } = React.useContext(globalContext);

  const [hover, setHover] = React.useState<boolean>(false);

  const handleEdit = () => {
    dispatchModal(
      <EditBookmarkModal bookmark={bookmark} categories={categories} />
    );
  };

  const handleDelete = () => {
    dispatchModal(<DeleteBookmarkModal bookmark={bookmark} />);
  };

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

      <td className="filterTable__row__category--noMobile">
        {bookmark.categories ? bookmark.categories.map(mapCategoryBadge) : null}
      </td>

      {/* todo: exact element width */}
      <td width={"50px"}>
        <div className="d-flex justify-content-end">
          <i
            className={
              "fas fa-cog me-2 " +
              (hover ? "filterTable__row__edit--hover" : "filterTable__row__edit")
            }
            onClick={handleEdit}
          />

          <i
            className={
              "fas fa-trash " +
              (hover ? "filterTable__row__delete--hover" : "filterTable__row__delete")
            }
            onClick={handleDelete}
          />
        </div>
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
