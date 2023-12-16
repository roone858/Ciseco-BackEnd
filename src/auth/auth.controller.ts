import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { MongoExceptionFilter } from 'src/exceptions/mongo-exception.filter';

@Controller('auth')
@UseFilters(MongoExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req: any) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    // Call your AuthService to handle user creation and authentication
    const result = await this.authService.signup(createUserDto);
    return { success: true, user: result };
  }
  @Post('check-username')
  async checkUsername(
    @Body() body: { username: string },
  ): Promise<{ isTaken: boolean }> {
    const isTaken = await this.authService.isUsernameTaken(body.username);
    return { isTaken };
  }

  @Post('check-email')
  async checkEmail(
    @Body() body: { email: string },
  ): Promise<{ isExists: boolean }> {
    const isExists = await this.authService.isEmailExists(body.email);
    return { isExists };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
