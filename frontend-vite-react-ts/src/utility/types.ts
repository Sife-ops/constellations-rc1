export interface Category {
  id: string;
  name: string;
  count?: number;
  selected?: boolean;
}

export interface Bookmark {
  id: string;
  url: string;
  description: string;
  categories: Category[];
}
