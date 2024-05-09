import { ProductRepository } from "../../../domain/repository/product";
import { ProductDTO } from "./product-dto";

export class CalculatteTotalPriceUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute(productDto: ProductDTO): Promise<number> {
    return await this.productRepository.calcualteTotalPrice(productDto);
  }
}
