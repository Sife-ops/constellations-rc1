import React from "react";
import { Bookmark as BookmarkType } from "../../../utility/type";
import { Button } from "react-bootstrap";
import { ModalWindow } from "../modal";
import { globalContext } from "../../../utility/context";
import { useBookmarkDeleteMutation } from "../../../generated/graphql";

interface Props {
  bookmark: BookmarkType;
}

export const DeleteBookmarkModal: React.FC<Props> = ({ bookmark }) => {
  const { hideModal, dispatchModal } = React.useContext(globalContext);

  const [mutation] = useBookmarkDeleteMutation();
  const handleConfirm = () => {
    mutation({
      variables: {
        bookmarkDeleteId: parseInt(bookmark.id),
      },
    }).then((e) => {
      console.log(e.data);
    });
    handleClose();
  };

  const handleClose = () => {
    dispatchModal(<></>);
    hideModal();
  };

  return (
    <ModalWindow
      heading="Delete Bookmark"
      body={
        <>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this bookmark? This cannot be
            undone.
          </p>
          <div className="d-grid gap-2 mb-2">
            <Button variant="danger" onClick={handleConfirm}>
              Yes, I'm sure.
            </Button>
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleClose}>
              No, take me back!
            </Button>
          </div>
        </>
      }
      footer={<></>}
    />
  );
};
