export interface CategoriesListType {
  id: number;
  name: string;
  icon: string;
  children?: CategoriesListType[]; // optional
}
