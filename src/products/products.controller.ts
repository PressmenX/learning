import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll() {
    return 'List of all products';
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return `Product id ${id}`;
  }

  @Post()
  create(@Body() payload: unknown) {
    return {
      status: 'succes',
      message: 'Created succesfully',
      data: payload ?? null,
    };
  }
}
