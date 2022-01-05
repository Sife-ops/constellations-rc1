export interface GlobalStateType {
  state1: number;
  state2: string;
}

export interface GlobalContextType {
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
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
