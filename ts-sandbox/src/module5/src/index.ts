// src/index.ts
import { Product, ProductService } from "./product";
import { CartService } from "./cart";
import { OrderService } from "./order";
import { formatCurrency, formatDate, isValidEmail } from "./utils";

// Initialize services
const productService = new ProductService();
const cartService = new CartService(productService);
const orderService = new OrderService(cartService);

// Add some products
const products: Product[] = [
  { id: "1", name: "T-shirt", price: 19.99, stock: 100 },
  { id: "2", name: "Jeans", price: 49.99, stock: 50 },
  { id: "3", name: "Sneakers", price: 79.99, stock: 25 },
];

products.forEach((product) => productService.addProduct(product));

// Simulate shopping
cartService.addItem("1", 2); // Add 2 T-shirts
cartService.addItem("2", 1); // Add 1 pair of jeans

console.log(`Cart total: ${formatCurrency(cartService.getTotal())}`);

// Create an order
const order = orderService.createOrder();
console.log("Order created:");
console.log(`- Date: ${formatDate(order.date)}`);
console.log(`- Total: ${formatCurrency(order.total)}`);
console.log("- Items:");
order.items.forEach((item) => {
  console.log(`  * ${item.product.name} x${item.quantity}`);
});

// Validate an email
const email = "customer@example.com";
console.log(`\nIs ${email} valid? ${isValidEmail(email)}`);
