export interface Product {
  id: number;
  productName: string;
  price: number;
  quantitySold: number;
}
export interface Demand {
  id: number;
  demand_score: number;
  product: Product;
}

export interface Region {
  id: number;
  name: string;
  population: number;
  demands: Demand[];
  xTile: number;
  zTile: number;
}
