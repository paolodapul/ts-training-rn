// src/cart/types.ts
import { Product } from "../product";

export interface CartItem {
  product: Product;
  quantity: number;
}
