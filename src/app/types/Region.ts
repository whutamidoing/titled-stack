export interface Product {
  name: string;
  demand: number;
}

export interface Region {
  id: number; // unique id
  name: string;
  population: number;
  products: Product[];
  xTile: number;
  zTile: number;
}
