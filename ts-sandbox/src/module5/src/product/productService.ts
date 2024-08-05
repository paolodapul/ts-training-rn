// src/product/productService.ts
import { Product } from "./types";

export class ProductService {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  updateStock(id: string, quantity: number): void {
    const product = this.getProduct(id);
    if (product) {
      product.stock += quantity;
    }
  }
}
