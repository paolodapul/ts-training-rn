// src/order/types.ts
import { CartItem } from "../cart";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}
