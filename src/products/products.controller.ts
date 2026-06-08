import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    const result = this.productsService.findAll();
    return {
      status: 'succes',
      message: 'Retrieved succesfully',
      data: result,
    };
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return `Product id ${id}`;
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    const result = this.productsService.create(payload);
    return {
      status: 'succes',
      message: 'Created succesfully',
      data: result ?? null,
    };
  }
}
