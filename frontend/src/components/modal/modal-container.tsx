import React from "react";
import { GlobalContext } from "../../utility/context";

export const ModalContainer: React.FC = () => {
  const {
    globalState: { modal },
  } = React.useContext(GlobalContext);
  return <>{modal.content}</>;
};
