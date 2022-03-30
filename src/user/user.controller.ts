import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtOAuthGuard } from 'src/core/guard/jwt.guard';
import { hashPassword } from 'src/core/helper/commons';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const body: CreateUserDto = {
      ...createUserDto,
      password: await hashPassword(createUserDto.password, 10),
    };
    return this.userService.create(body);
  }

  @Get('/list')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtOAuthGuard)
  @Get('show/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtOAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
