import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dto/createProduct.dto';
import type IProductRepository from '../interfaces/product-repository.interface';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo: IProductRepository,
  ) {}

  execute(dto: CreateProductDTO) {
    return this.productRepo.save(dto);
  }
}
