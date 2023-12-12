import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: [Address], required: true, default: [] })
  address: Address[];

  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  })
  cart: {
    product: mongoose.Schema.Types.ObjectId;
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