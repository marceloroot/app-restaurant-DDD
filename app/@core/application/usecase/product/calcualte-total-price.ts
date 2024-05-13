import { Product, ProductProps } from "@/app/@core/domain/entities/product";
import { ProductRepository } from "../../../domain/repository/product";

export class CalculatteTotalPriceUseCase {
  constructor(private productRepository: ProductRepository) {}
  execute(product: ProductProps): number {
    const productEntity = new Product({
      id: product.id,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      description: product.description,
      discountPercentage: product.discountPercentage,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      restaurantId: product.restaurantId,
    });
    return this.productRepository.calcualteTotalPrice(productEntity);
  }
}
