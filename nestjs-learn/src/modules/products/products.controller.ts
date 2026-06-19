import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../guard/api-key.guard';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { GetAllProductUseCase } from './use-cases/get-all-product.use-case';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/createProduct.dto';

@ApiTags('Products')
@ApiSecurity('api-key')
@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductUseCase: GetAllProductUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Data retrieved successful',
  })
  getAll() {
    return this.getAllProductUseCase.execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Data retrieved successful',
  })
  getById(@Param('id') id: string) {
    return `Product id ${id}`;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Data created successful',
  })
  create(@Body() payload: CreateProductDTO) {
    return this.createProductUseCase.execute(payload);
  }
}
