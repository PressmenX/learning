import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
export class GetAllProductUseCase {
  constructor(private readonly productService: ProductsService) {}

  execute() {
    return this.productService.findAll();
  }
}
