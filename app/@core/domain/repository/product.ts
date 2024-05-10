import { ProductDTO } from "../../application/usecase/product/product-dto";

export interface ProductRepository {
  findAll(): Promise<ProductDTO[]>;
  calcualteTotalPrice(productDto: ProductDTO): Promise<number>;
}
