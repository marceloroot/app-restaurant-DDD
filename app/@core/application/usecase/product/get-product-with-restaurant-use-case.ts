import { Product, ProductProps } from "@/app/@core/domain/entities/product";
import { ProductRepository } from "../../../domain/repository/product";
import { RestaurantRepository } from "@/app/@core/domain/repository/restaurant";
import { ProductWithRestaurant } from "./DTO/product-with-restaurant-DTO";
import { RestauranttProps } from "@/app/@core/domain/entities/restaurant";

export class GetProductWithRestaurantUseCase {
  constructor(
    private productRepository: ProductRepository,
    private restaurantRepository: RestaurantRepository,
  ) {}
  async execute(productId: string): Promise<ProductWithRestaurant | undefined> {
    const product = await this.productRepository.findById(productId);

    if (!product) return undefined;
    const restaurant = await this.restaurantRepository.findById(
      product.restaurantId,
    );

    if (!restaurant) return undefined;
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
    return new ProductWithRestaurant(productDTO, restaurantDTO);
  }
}
