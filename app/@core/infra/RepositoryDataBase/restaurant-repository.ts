import { Decimal } from "@prisma/client/runtime/library";
import { RestaurantRepository } from "../../domain/repository/restaurant";
import { Restaurant } from "../../domain/entities/restaurant";
import { PrismaClient } from "@prisma/client";

export class RestaurantRepositoryDataBase implements RestaurantRepository {
  constructor(private prisma: PrismaClient) {}
  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({ take: 10 });
    console.log("ENTROUUUU", restaurants);
    if (restaurants.length <= 0) return [];

    return restaurants.map(
      (data) =>
        new Restaurant({
          id: data.id,
          name: data.name,
          imageUrl: data.imageUrl,
          deliveryFee: Number(data.deliveryFee),
          deliveryTimeMinutes: Number(data.deliveryTimeMinutes),
        }),
    );
  }
}
