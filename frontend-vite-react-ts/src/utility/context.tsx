import React from "react";
import { GlobalStateType, GlobalContextType, ModalType } from "./types";

const initialState: GlobalStateType = {
  state1: 33,
  state2: "thirty-three",
  modal: {
    show: false,
  },
};

const useGlobalState = (): GlobalContextType => {
  const [globalState, setGlobalState] =
    React.useState<GlobalStateType>(initialState);

  const setModal = (modalState: ModalType) =>
    setGlobalState((state) => ({
      ...state,
      modal: {
        ...state.modal,
        ...modalState,
      },
    }));

  const showModal = () =>
    setGlobalState((state) => ({
      ...state,
      modal: {
        ...state.modal,
        show: true,
      },
    }));

  const hideModal = () =>
    setGlobalState((state) => ({
      ...state,
      modal: {
        ...state.modal,
        show: false,
      },
    }));

  return {
    //
    globalState,
    setGlobalState,
    setModal,
    showModal,
    hideModal,
  };
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
