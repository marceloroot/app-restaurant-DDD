import { Product } from "../entities/product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  calcualteTotalPrice(product: Product): number;
  findAllByCategoryAndRestaurant(
    idCategory: string,
    idRestaurant: string,
  ): Promise<Product[]>;
}
