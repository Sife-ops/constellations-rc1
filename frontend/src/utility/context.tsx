import React from "react";
import { GlobalState, GlobalContext } from "./type";

const initialState: GlobalState = {
  userId: null,
  modal: {
    show: false,
    content: null,
  },
};

const useGlobalState = (): GlobalContext => {
  const [globalState, setGlobalState] =
    React.useState<GlobalState>(initialState);

  const setUserId = (userId: string) =>
    setGlobalState((state) => ({
      ...state,
      userId,
    }));

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
    setUserId,
    showModal,
  };
};

export const globalContext = React.createContext<GlobalContext>(
  {} as GlobalContext
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
