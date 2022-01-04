export interface Category {
  id: string;
  name?: string;
  count?: number;
  selected?: boolean;
}

export interface Bookmark {
  id: string;
  url: string;
  description: string;
  categories: Category[];
}

export interface ModalState {
  show: boolean;
  heading?: string;
  body?: JSX.Element;
  footer?: JSX.Element;
}

export interface GlobalStateType {
  state1: number;
  state2: string;
}

export interface GlobalContextType {
  globalState: GlobalStateType;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
}
