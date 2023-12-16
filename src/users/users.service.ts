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
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    const users = await this.userModel.find();
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
    return this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
  }
}
