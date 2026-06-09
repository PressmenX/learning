import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { GetAllProductUseCase } from './use-cases/get-all-product.use-case';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [CreateProductUseCase, GetAllProductUseCase, ProductsService],
})
export class ProductsModule {}
