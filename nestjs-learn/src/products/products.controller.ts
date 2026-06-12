import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateProductDTO } from 'src/products/dto/createProduct.dto';
import { ApiKeyGuard } from 'src/guard/api-key/api-key.guard';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { GetAllProductUseCase } from './use-cases/get-all-product.use-case';

@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
  ) {}

  @Get()
  getAll() {
    return this.getAllProductUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return `Product id ${id}`;
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.createProductUseCase.execute(payload);
  }
}
