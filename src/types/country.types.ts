export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  country_id?: number;
}

