// src/order/orderService.ts
import { Order } from "./types";
import { CartService } from "../cart";

export class OrderService {
  private orders: Order[] = [];

  constructor(private cartService: CartService) {}

  createOrder(): Order {
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: this.cartService["items"], // Accessing private property for simplicity
      total: this.cartService.getTotal(),
      date: new Date(),
    };
    this.orders.push(order);
    return order;
  }

  getOrder(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }
}
