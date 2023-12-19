import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // async validateUser(username: string, password: string): Promise<any> {
  //   const user = await this.userModel.findOne({ username });
  //   const isPasswordCorrect = user && (await user.isPasswordCorrect(password));
  //   if (isPasswordCorrect) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  async generateToken(id: string) {
    const payload = { _id: id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(identifier: string, pass: string) {
    const user = await this.usersService.findByEmailOrUsername(identifier);

    if (!(await this.usersService.comparePasswords(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { _id: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create({
      ...createUserDto,
      role: 'user',
    });

    return {
      user: newUser,
      access_token: await this.jwtService.signAsync({ _id: newUser._id }),
    };
  }

  async validateGoogleUser(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }

  async createGoogleUser(profile: any): Promise<any> {
    const newUser = new this.userModel({
      email: profile.emails[0].value,
      name: profile.displayName,
    });
    return await newUser.save();
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ username });
    return !!existingUser;
  }

  async isEmailExists(email: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ email });
    return !!existingUser;
  }
}
