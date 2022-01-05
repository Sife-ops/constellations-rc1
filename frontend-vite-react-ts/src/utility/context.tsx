import React from "react";
import { GlobalStateType, GlobalContextType, ModalType } from "./types";

const initialState: GlobalStateType = {
  modal: {
    show: false,
  },
};

const useGlobalState = (): GlobalContextType => {
  const [globalState, setGlobalState] =
    React.useState<GlobalStateType>(initialState);

  // todo: rename and implement automatic merging
  const _setGlobalState = (newState: GlobalStateType): void =>
    setGlobalState((state) => ({
      ...state,
      ...newState,
    }));

  const setModal = (modalState: ModalType): void =>
    setGlobalState((state) => ({
      ...state,
      modal: {
        ...state.modal,
        ...modalState,
      },
    }));

  const displayModal = (whether: boolean): void =>
    setGlobalState((state) => ({
      ...state,
      modal: {
        ...state.modal,
        show: whether,
      },
    }));

  const showModal = (): void => displayModal(true);

  const hideModal = (): void => displayModal(false);

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
