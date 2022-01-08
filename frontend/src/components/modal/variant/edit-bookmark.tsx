import React from "react";
import { BookmarkType } from "../../../utility/type";
import { Button } from "react-bootstrap";
import { globalContext } from "../../../utility/context";
import { ModalWindow } from "../modal";

interface Props {
  bookmark: BookmarkType;
}

export const EditBookmarkModal: React.FC<Props> = ({ bookmark }) => {
  const { hideModal } = React.useContext(globalContext);

  const handleSubmit = () => hideModal();

  return (
    <ModalWindow
      heading="Edit Bookmark"
      body={<div>{bookmark.description}</div>}
      footer={
        <Button variant="success" onClick={handleSubmit}>
          Confirm
        </Button>
      }
    />
  );
};
