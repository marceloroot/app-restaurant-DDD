import { ProductRepository } from "@/app/@core/domain/repository/product";

import { RestaurantRepository } from "@/app/@core/domain/repository/restaurant";
import { ProductWithRestaurant } from "./DTO/product-with-restaurant-DTO";
import { ProductProps } from "@/app/@core/domain/entities/product";
import { RestauranttProps } from "@/app/@core/domain/entities/restaurant";

export class ListProducByCategoryIdRestaurantIdtUseCase {
  constructor(
    private productRepository: ProductRepository,
    private restaurantRepository: RestaurantRepository,
  ) {}

  async execute(
    idCategory: string,
    restaurantId: string,
  ): Promise<ProductWithRestaurant[]> {
    const productsWithRestaurant: ProductWithRestaurant[] = [];
    const products =
      await this.productRepository.findAllByCategoryAndRestaurant(
        idCategory,
        restaurantId,
      );
    if (!products) return [];
    for (const product of products) {
      const restaurant = await this.restaurantRepository.findById(
        product.restaurantId,
      );
      if (!restaurant) continue;
      product.associateRestaurant(restaurant);

      const productDTO: ProductProps = {
        id: product.id,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        description: product.description,
        discountPercentage: product.discountPercentage,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        restaurantId: product.restaurantId,
      };
      const restaurantDTO: RestauranttProps = {
        id: restaurant.id,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        imageUrl: restaurant.imageUrl,
        name: restaurant.name,
      };

      productsWithRestaurant.push({
        product: productDTO,
        restaurant: restaurantDTO,
      });
    }
    return productsWithRestaurant.length > 0 ? productsWithRestaurant : [];
  }
}
