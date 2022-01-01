export interface Category {
  id?: number;
  name: string;
  count?: number;
}

export interface Bookmark {
  id?: number;
  url: string;
  description: string;
  categories: Category[];
}
