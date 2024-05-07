import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repository/product";

export class ListProductUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
