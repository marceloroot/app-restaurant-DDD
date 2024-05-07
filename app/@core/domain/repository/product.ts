import { Product } from "../entities/product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
}
