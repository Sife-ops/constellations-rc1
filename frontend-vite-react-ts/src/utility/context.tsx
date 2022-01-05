import React from "react";
import { GlobalStateType, GlobalContextType } from "./types";

const initialState: GlobalStateType = {
  state1: 33,
  state2: "thirty-three",
};

const useGlobalState = () => {
  const [globalState, setGlobalState] =
    React.useState<GlobalStateType>(initialState);

  return { globalState, setGlobalState };
};

export const GlobalContext = React.createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const GlobalProvider: React.FC = ({ children }) => {
  const state = useGlobalState();
  return (
    <GlobalContext.Provider value={state}>
      {/* // */}
      {children}
    </GlobalContext.Provider>
  );
};
