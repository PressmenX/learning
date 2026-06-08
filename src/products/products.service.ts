import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/products/dto/createProduct.dto';

@Injectable()
export class ProductsService {
  private products: CreateProductDTO[] = [];

  findAll() {
    return this.products;
  }

  create(product: CreateProductDTO) {
    this.products.push(product);
    return product;
  }
}
