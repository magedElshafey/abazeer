import { NameAndId } from "@/types/global.types";

export interface Address {
  id: number;
  name: string;
  address: string;
  city_id: NameAndId;
  country_id: NameAndId;
  is_active: boolean;
  is_default: boolean;
  postcode: string;
}