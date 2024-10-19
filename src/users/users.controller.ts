import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findUniqueUser(@Param('id') id: number): Promise<User> {
    const user: User = await this.usersService.findUniqueUser(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Post()
  async createNewUser(@Body() user: User): Promise<User> {
    return this.usersService.createNewUser(user);
  }

  @Put('id')
  async updateUser(
    @Body() updateUser: User,
    @Param('id') id: number,
  ): Promise<User> {
    const findUser: User = await this.usersService.findUniqueUser(id);
    if (!findUser) {
      throw new NotFoundException('User not found!');
    }
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete('id')
  async removeUser(@Param('id') id: number): Promise<void> {
    const findUser: User = await this.usersService.findUniqueUser(id);
    if (!findUser) {
      throw new NotFoundException('User not found!');
    }
    return this.removeUser(id);
  }
}
