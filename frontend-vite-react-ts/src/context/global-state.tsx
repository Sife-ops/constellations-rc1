import React from "react";
import { GlobalStateType } from "../utility/types";

const initialState: GlobalStateType = {
  state1: 33,
  state2: "thirty-three",
};

export const useGlobalState = () => {
  const [globalState, setGlobalState] =
    React.useState<GlobalStateType>(initialState);

  return { globalState, setGlobalState };
};
