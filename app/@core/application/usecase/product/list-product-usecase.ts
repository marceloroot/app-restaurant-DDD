import { ProductRepository } from "@/app/@core/domain/repository/product";
import { ProductWithRestaurant } from "./DTO/product-with-restaurant-DTO";
import { RestaurantRepository } from "@/app/@core/domain/repository/restaurant";

export class ListProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private restaurantRepository: RestaurantRepository,
  ) {}

  async execute(): Promise<ProductWithRestaurant[]> {
    const productsWithRestaurant: ProductWithRestaurant[] = [];
    const products = await this.productRepository.findAll();
    if (!products) return [];
    for (const product of products) {
      const restaurant = await this.restaurantRepository.findById(
        product.restaurantId,
      );
      if (!restaurant) continue;
      product.associateRestaurant(restaurant);
      productsWithRestaurant.push(
        new ProductWithRestaurant(product, restaurant),
      );
    }
    return productsWithRestaurant.length > 0 ? productsWithRestaurant : [];
  }
}
