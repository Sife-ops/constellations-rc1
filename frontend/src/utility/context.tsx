import React from "react";
import { GlobalStateType, globalContextType, ModalType } from "./type";

const initialState: GlobalStateType = {
  modal: {
    show: false,
    content: null,
  },
};

const useGlobalState = (): globalContextType => {
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

export const globalContext = React.createContext<globalContextType>(
  {} as globalContextType
);

export const GlobalProvider: React.FC = ({ children }) => {
  const state = useGlobalState();

  return (
    <globalContext.Provider value={state}>
      {/* // */}
      {children}
    </globalContext.Provider>
  );
};
