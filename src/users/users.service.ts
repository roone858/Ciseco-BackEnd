/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressService } from 'src/address/address.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private addressService: AddressService,
  ) {}

  async findAll() {
    const users = await this.userModel.find().select('-password -phone').lean();
    if (!users) {
      throw new NotFoundException();
    }

    return users;
  }
  async findOne(username: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async findOneById(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async findByEmailOrUsername(
    identifier: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = +process.env.SALT_ROUNDS;
    const hashedPassword = await bcrypt.hash(
      password + process.env.HASH_PASSWORD_KEY,
      saltRounds,
    );
    return hashedPassword;
  }

  async comparePasswords(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const passwordMatch = await bcrypt.compare(
      enteredPassword + process.env.HASH_PASSWORD_KEY,
      storedPassword,
    );
    return passwordMatch;
  }

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return null; // User not found
    }
    // Compare the entered current password with the stored hashed password
    const isPasswordValid = await this.comparePasswords(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return null; // Current password is not valid
    }
    // Hash the new password before updating it in the database
    const hashedNewPassword = await this.hashPassword(newPassword);
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { password: hashedNewPassword } },
        { new: true },
      )
      .exec();
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.address) {
      const address = await this.addressService.createAddress(
        createUserDto.address,
      );
      createUserDto.addressId = (address as any)._id;
    }
    const user = new this.userModel({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
    const result = await user.save();

    const { password, ...userWithoutPassword } = result.toObject();

    return userWithoutPassword;
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password, ...updateData } = updateUserDto;
    if (updateData.address) {
      const address = await this.addressService.createAddress(
        updateData.address,
      );
      updateData.address = (address as any)._id;
    }
    return this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
  }
  async confirmEmail(userId: string, isConfirm: boolean): Promise<any> {
    return this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $set: { confirmed: isConfirm } },
        { new: true },
      )
      .exec();
  }
  async updateProfileImage(userId: string, filename: string): Promise<any> {
    return this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $set: { image: filename } },
        { new: true },
      )
      .exec();
  }
}
