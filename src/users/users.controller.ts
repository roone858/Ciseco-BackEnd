import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards()
  // @Get(':username')
  // findOne(@Param('username') username: string) {
  //   return this.usersService.findOneForUser(username);
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards()
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   // return this.usersService.update(+id, updateUserDto);
  // }

  // @UseGuards()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.usersService.remove(+id);
  // }
}
