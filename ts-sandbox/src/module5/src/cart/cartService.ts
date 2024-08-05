// src/cart/cartService.ts
import { CartItem } from "./types";
import { ProductService } from "../product";

export class CartService {
  private items: CartItem[] = [];

  constructor(private productService: ProductService) {}

  addItem(productId: string, quantity: number): void {
    const product = this.productService.getProduct(productId);
    if (product && product.stock >= quantity) {
      const existingItem = this.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.productService.updateStock(productId, -quantity);
    }
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      const { product, quantity } = this.items[index];
      this.items.splice(index, 1);
      this.productService.updateStock(product.id, quantity);
    }
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}
