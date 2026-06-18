import { CreateProductDTO } from '../dto/createProduct.dto';

interface IProductRepository {
  findAll(): CreateProductDTO[];
  save(product: CreateProductDTO): CreateProductDTO;
}

export default IProductRepository;
