import {
  Body,
  Post,
  Controller,
  UseGuards,
  Get,
  Patch,
  Request,
  Req,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from './admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import * as path from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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

  @Post('profile-picture')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Specify the directory where files will be stored
        filename: (req, file, cb) => {
          console.log(file);
          const userId = (req as any).user._id; // Assuming you have a user object in the request
          const fileExtension = path.extname(file.originalname);
          const fileName = userId + Date.now() + fileExtension;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadProfilePicture(@UploadedFile() file, @Req() req) {
    const { _id } = req.user;
    const userProfile = await this.usersService.updateProfileImage(
      _id,
      file.filename,
    );
    return userProfile;
  }

  @Get('/profile-picture/:image')
  getProfilePicture(@Param('image') image: string, @Res() res: Response) {
    // Construct the path to the user's profile picture
    const imagePath = join(__dirname, '..', '..', 'uploads', image);
    // Send the file as a response
    res.sendFile(imagePath);
  }
}
