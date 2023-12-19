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
  Res,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { Roles } from 'src/users/roles.decorator';
// import { RolesGuard } from 'src/users/roles.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { MongoExceptionFilter } from 'src/exceptions/mongo-exception.filter';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
@UseFilters(MongoExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() req: any) {
    return req.user;
  }

  @Get('confirm')
  async emailConfirmation(@Query() query: { token: string }) {
    return await this.authService.confirmEmail(query.token);
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req, @Res() res) {
    console.log(req);
    console.log(res);
    res.redirect(
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=267959229684-cb60rimtu2gkm8p0g472pnnbdgqmjsbg.apps.googleusercontent.com',
    );
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // Handles the Google authentication callback
    try {
      const user = (req as any).user;
      console.log(user);
      const token = await this.authService.generateToken(user._id);
      return res.json(token);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
