import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    const user = await this.userModel.find();
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
  async findOne(username: string) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(newUser: CreateUserDto) {
    // const passwordHash = await CryptoService.hash(createUserDto.password);
    const user = new this.userModel({
      ...newUser,
    });
    const returnUser = await user.save();
    return returnUser;
  }
}
