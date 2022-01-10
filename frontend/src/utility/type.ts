export interface GlobalStateType {
  modal: {
    show: boolean;
    content: JSX.Element | null;
  };
}

// todo: rename
export interface globalContextType {
  dispatchModal: (content: JSX.Element) => void;
  globalState: GlobalStateType;
  hideModal: () => void;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
  showModal: () => void;
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

export interface CreateBookmarkOptions {
  userId: number;
  description: string;
  url: string;
  categoryIds: number[];
}

export interface UpdateBookmarkOptions {
  url?: string;
  description?: string;
  categoryIds?: number[];
}
