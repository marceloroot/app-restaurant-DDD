import { ProductDTO } from "../../application/usecase/product/product-dto";
import { Product } from "../entities/product";

export interface ProductRepository {
  findAll(): Promise<ProductDTO[]>;
  calcualteTotalPrice(productDto: ProductDTO): Promise<number>;
}
