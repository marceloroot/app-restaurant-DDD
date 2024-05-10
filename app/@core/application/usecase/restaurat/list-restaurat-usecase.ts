import { Restaurant } from "@/app/@core/domain/entities/restaurant";
import { RestaurantRepository } from "@/app/@core/domain/repository/restaurant";

export class ListRestaurantUseCase {
  constructor(readonly restaurantRepositore: RestaurantRepository) {}
  async execute(): Promise<Restaurant[]> {
    return await this.restaurantRepositore.findAll();
  }
}
