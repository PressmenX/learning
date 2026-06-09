import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductDTO } from '../dto/createProduct.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productService: ProductsService) {}

  execute(dto: CreateProductDTO) {
    return this.productService.create(dto);
  }
}
