import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipcode: string;
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop()
  cart: {
    product_id: string; // Assuming product_id is a string in MongoDB
    quantity: number;
  }[];

  @Prop({ required: true, default: 'user', enum: ['user', 'admin'] })
  role: 'user' | 'admin';
  isPasswordCorrect: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.isPasswordCorrect = async function (
  password: string,
): Promise<boolean> {
  return password == this.password;
};
