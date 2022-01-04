import React from "react";
import { GlobalContextType } from "../utility/types";

export const GlobalContext = React.createContext<GlobalContextType>(
  {} as GlobalContextType
);
