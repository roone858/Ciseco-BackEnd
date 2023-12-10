import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards()
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @UseGuards(auth)
  // @Get(':username')
  // findOne(@Param('username') username: string) {
  //   return this.usersService.findOne(username);
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

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
