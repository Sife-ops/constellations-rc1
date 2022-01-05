import React from "react";
import { GlobalContext } from "../utility/context";

export const C2: React.FC = () => {
  const { globalState, setGlobalState } = React.useContext(GlobalContext);

  return (
    <div>
      no u
      <br />
      <button
        onClick={() => {
          setGlobalState((state) => ({
            ...state,
            state1: 55,
          }));
        }}
      >
        button
      </button>
    </div>
  );
};
