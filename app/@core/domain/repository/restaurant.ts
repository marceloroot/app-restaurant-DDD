import { Restaurant } from "../entities/restaurant";

export interface RestaurantRepository {
  findAll(): Promise<Restaurant[]>;
}
