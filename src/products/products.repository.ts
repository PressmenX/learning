import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/products/dto/createProduct.dto';
import IProductRepository from './interfaces/product-repository.interface';

@Injectable()
export class ProductsRepository implements IProductRepository {
  private products: CreateProductDTO[] = [];

  findAll() {
    return this.products;
  }

  save(product: CreateProductDTO) {
    this.products.push(product);
    return product;
  }
}
