import { ProductDTO } from "./product-dto";
import { ProductRepository } from "../../../domain/repository/product";

export class ListProductUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute(): Promise<ProductDTO[]> {
    return await this.productRepository.findAll();
  }
}
