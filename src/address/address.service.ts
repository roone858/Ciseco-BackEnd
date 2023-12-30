// address.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}

  async createAddress(addressData: Partial<Address>): Promise<Address> {
    const createdAddress = new this.addressModel(addressData);
    return createdAddress.save();
  }

  async findById(id: string): Promise<Address> {
    return this.addressModel.findById(id).exec();
  }
}
