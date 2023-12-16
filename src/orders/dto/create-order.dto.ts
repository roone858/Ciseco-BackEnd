import { User } from 'src/users/schemas/user.schema';

export class CreateOrderDto {
  user: User; // Assuming customer ID for simplicity
  order_date: Date;
  total_amount: number;
  order_items: OrderItem[]; // You need to define OrderItem structure
}

export class OrderItem {
  product: string; // Assuming product ID for simplicity
  quantity: number;
  subtotal: number;
}
