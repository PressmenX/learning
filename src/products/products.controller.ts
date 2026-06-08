import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/products/dto/createProduct.dto';
import { ApiKeyGuard } from 'src/guard/api-key/api-key.guard';

@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return `Product id ${id}`;
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }
}
