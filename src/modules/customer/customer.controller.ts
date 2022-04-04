import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { hashPassword } from 'src/core/helper/commons';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/create')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const body: CreateCustomerDto = {
      ...createCustomerDto,
      password: await hashPassword(createCustomerDto.password, 10),
    };
    return this.customerService.create(body);
  }

  @Get('/list')
  findAll() {
    return this.customerService.findAll();
  }

  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
