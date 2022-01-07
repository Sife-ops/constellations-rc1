export interface GlobalStateType {
  modal: ModalType;
}

export interface GlobalContextType {
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
  setModal: (modalState: ModalType) => void;
  showModal: () => void;
  hideModal: () => void;
}

export interface CategoryType {
  id: string;
  name?: string;
  count?: number;
  selected?: boolean;
}

export interface BookmarkType {
  id: string;
  url: string;
  description: string;
  categories: CategoryType[];
}

export interface ModalType {
  show: boolean;
  heading?: string;
  body?: JSX.Element;
  footer?: JSX.Element;
}
