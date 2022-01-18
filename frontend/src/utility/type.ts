export interface BookmarkType {
  id: string;
  description: string;
  url: string;
  categories: CategoryType[];
}

export interface BookmarkAddForm {
  description: string;
  url: string;
  // categoryIds: number[];
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

export interface Category {
  __typename?: "Category" | undefined;
  id: string;
  name: string;
  bookmarks?: Bookmark[] | null | undefined;
  selected?: boolean;
}

export interface Bookmark {
  __typename?: "Bookmark" | undefined;
  id: string;
  url: string;
  description: string;
  categories?: Category[] | null | undefined;
}

export interface GlobalContext {
  dispatchModal: (content: JSX.Element) => void;
  globalState: GlobalState;
  hideModal: () => void;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  setUserId: (userId: number) => void;
  showModal: () => void;
}

export interface GlobalState {
  userId: number | null;
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
