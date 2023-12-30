import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from 'src/address/address.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, unique: false })
  googleId: string;

  @Prop({ required: false, unique: true })
  username: string;

  @Prop({ required: false, unique: false })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: false })
  dob: Date;

  @Prop({ required: false, unique: false })
  bio: string;

  @Prop({ required: false, enum: ['Male', 'Female'] })
  gender: 'Male' | 'Female';

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false, default: false })
  confirmed: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Address.name,
    required: false,
    unique: true,
  })
  address: mongoose.Types.ObjectId;

  @Prop({ required: false, default: 'user', enum: ['user', 'admin'] })
  role: 'user' | 'admin';
  isPasswordCorrect: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.isPasswordCorrect = async function (
  password: string,
): Promise<boolean> {
  return password == this.password;
};
