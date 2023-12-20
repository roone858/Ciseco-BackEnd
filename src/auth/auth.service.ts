import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserRole } from 'src/users/dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: MailService,
  ) {}

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
    createUserDto.role = UserRole.User;
    const newUser = await this.usersService.create({
      ...createUserDto,
    });
    const token = await this.jwtService.signAsync({ _id: newUser._id });
    this.emailService.sendVerificationEmail(createUserDto.email, token);
    return {
      user: {},
      access_token: token,
    };
  }

  async confirmEmail(token: string): Promise<any> {
    const decoded = await this.jwtService.decode(token);

    if (!decoded) {
      throw new NotFoundException('Invalid confirmation token');
    }
    const user = await this.usersService.findOneById(decoded._id);
    if (user) {
      this.usersService.confirmEmail(decoded._id, true);
      return 'confirmed';
    }
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
