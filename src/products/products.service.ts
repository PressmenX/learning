import { Injectable } from '@nestjs/common';

export type Payload = Record<string, unknown>;

@Injectable()
export class ProductsService {
  private products: Payload[] = [];

  findAll() {
    return this.products;
  }

  create(product: Payload) {
    this.products.push(product);
    return product;
  }
}
