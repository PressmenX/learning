import { Inject, Injectable } from '@nestjs/common';
import type IProductRepository from '../interfaces/product-repository.interface';

@Injectable()
export class GetAllProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productService: IProductRepository,
  ) {}

  execute() {
    return this.productService.findAll();
  }
}
