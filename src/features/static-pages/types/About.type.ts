export interface AboutType {
  header: {
    id: number;
    name: string;
    description: string;
    meta_description: string;
    image: string;
  };
  main: {
    id: number;
    name: string;
    description: string;
    meta_description: string;
    image: string;
  };
  other: {
    id: number;
    name: string;
    description: string;
    meta_description: string;
    image: string;
  }[];
}
