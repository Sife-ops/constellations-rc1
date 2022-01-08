import React from "react";
import { BookmarkType } from "../../../utility/type";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

interface Props {
  bookmark: BookmarkType;
}

export const DeleteBookmarkModal: React.FC<Props> = ({ bookmark }) => {
  const { hideModal } = React.useContext(GlobalContext);

  const handleSubmit = () => hideModal();

  return (
    <ModalWindow
      heading="Delete Bookmark"
      body={<div>{bookmark.description}</div>}
      footer={
        <Button variant="danger" onClick={handleSubmit}>
          Confirm
        </Button>
      }
    />
  );
};
