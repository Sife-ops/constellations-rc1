import React from "react";

interface GlobalStateType {
  state1: number;
  state2: string;
}

const initialState: GlobalStateType = {
  state1: 33,
  state2: "thirty-three",
};

const useGlobalState = () => {
  const [globalState, setGlobalState] =
    React.useState<GlobalStateType>(initialState);

  return { globalState, setGlobalState };
};

interface GlobalContextType {
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
}

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
