import React from "react";
import { GlobalStateType, GlobalContextType, ModalType } from "./types";

const initialState: GlobalStateType = {
  modal: {
    show: false,
    content: null,
  },
};

const useGlobalState = (): GlobalContextType => {
  const [globalState, setGlobalState] =
    React.useState<GlobalStateType>(initialState);

  const dispatchModal = (content: JSX.Element): void =>
    setGlobalState((state) => ({
      ...state,
      modal: {
        show: true,
        content: content,
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
    dispatchModal,
    globalState,
    hideModal,
    setGlobalState,
    showModal,
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
