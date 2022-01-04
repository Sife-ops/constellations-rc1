import React from "react";
import { GlobalContext } from "./global-context";
import { useGlobalState } from "./global-state";

export const GlobalProvider: React.FC = ({ children }) => {
  const state = useGlobalState();
  return (
    <GlobalContext.Provider value={state}>
      {/* // */}
      {children}
    </GlobalContext.Provider>
  );
};
