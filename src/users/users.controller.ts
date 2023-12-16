import {
  Body,
  Post,
  Controller,
  UseGuards,
  Get,
  Patch,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from './admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(auth)
  // @Get(':username')
  // findOne(@Param('username') username: string) {
  //   return this.usersService.findOne(username);
  // }

  @Post()
  @UseGuards(AdminGuard)
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user._id, updateUserDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() req,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ message: string }> {
    const { _id } = req.user;
    const user = await this.usersService.changePassword(
      _id,
      currentPassword,
      newPassword,
    );
    if (user) {
      return { message: 'Password changed successfully' };
    } else {
      return {
        message: 'Current password is incorrect or failed to change password',
      };
    }
  }
  // @UseGuards()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.usersService.remove(+id);
  // }
}
