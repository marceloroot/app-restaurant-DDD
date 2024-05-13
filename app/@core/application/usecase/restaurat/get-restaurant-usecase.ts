import { Restaurant } from "@/app/@core/domain/entities/restaurant";
import { RestaurantRepository } from "@/app/@core/domain/repository/restaurant";

export class GetRestaurantUseCase {
  constructor(readonly restaurantRepositore: RestaurantRepository) {}
  async execute(id: string): Promise<Restaurant> {
    return await this.restaurantRepositore.findById(id);
  }
}
