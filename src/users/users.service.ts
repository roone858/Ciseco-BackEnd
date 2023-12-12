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

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
    const result = await user.save();

    const { password, ...userWithoutPassword } = result.toObject();

    return userWithoutPassword;
  }
}
