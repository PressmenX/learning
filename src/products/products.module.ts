import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { GetAllProductUseCase } from './use-cases/get-all-product.use-case';
import { ProductsRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    GetAllProductUseCase,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductsRepository,
    },
  ],
})
export class ProductsModule {}
