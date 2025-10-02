import type { IconType } from "react-icons";
export type Categories = {
  id: number;
  icon: IconType;
  mainCateogry: string;
  sub?: {
    id: number;
    title: string;
    subSub?: { id: number; title: string }[];
  }[];
};
