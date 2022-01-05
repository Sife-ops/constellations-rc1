import React from "react";
import { C2 } from "./c2";
import { GlobalContext } from "../utility/context";

export const C1: React.FC = () => {
  const { globalState } = React.useContext(GlobalContext);

  return (
    <div>
      {/* // */}
      {globalState.state1}
      <br />
      {globalState.state2}
      <br />
      <C2 />
    </div>
  );
};
