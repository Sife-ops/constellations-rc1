import React from "react";
import { globalContext } from "../../utility/context";

export const ModalContainer: React.FC = () => {
  const {
    globalState: { modal },
  } = React.useContext(globalContext);
  return <>{modal.content}</>;
};
