export class CreateOrderDto {
  user: string; // Assuming customer ID for simplicity
  order_date: Date;
  total_amount: number;
  order_items: OrderItem[]; // You need to define OrderItem structure
}

export class OrderItem {
  product: string; // Assuming product ID for simplicity
  quantity: number;
  subtotal: number;
}
