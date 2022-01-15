export interface BookmarkType {
  id: string;
  description: string;
  url: string;
  categories: CategoryType[];
}

export interface BookmarkAddForm {
  description: string;
  url: string;
  categoryIds: number[];
}

export interface BookmarkEditForm {
  description?: string;
  url?: string;
  categoryIds?: number[];
}

export interface CategoryType {
  id: string;
  name: string;
  count?: number;
  selected?: boolean;
}

export interface GlobalContext {
  dispatchModal: (content: JSX.Element) => void;
  globalState: GlobalState;
  hideModal: () => void;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  showModal: () => void;
}

export interface GlobalState {
  modal: {
    show: boolean;
    content: JSX.Element | null;
  };
}

export interface ModalContent {
  show: boolean;
  heading?: string;
  body?: JSX.Element;
  footer?: JSX.Element;
}
