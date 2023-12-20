import {
  IsString,
  IsDate,
  IsNumber,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItem {
  @IsString()
  product: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  subtotal: number;
}

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsDate()
  order_date: Date;

  @IsNumber()
  total_amount: number;

  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @ArrayMinSize(1, { message: 'At least one order item is required' })
  order_items: OrderItem[];
}
