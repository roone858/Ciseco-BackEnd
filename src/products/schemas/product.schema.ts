import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: false })
  subCategory: string;

  @Prop({ type: [String], default: [] })
  sizes: string[];

  @Prop({ type: [String], default: [] })
  colors: string[];

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop()
  feature?: string;

  @Prop({ default: false })
  expert: boolean;

  @Prop()
  discount?: string;

  @Prop({ default: false })
  new: boolean;

  @Prop({ default: false })
  trend: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
