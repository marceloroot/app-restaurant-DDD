import { GetRestaurantUseCase } from "@/app/@core/application/usecase/restaurat/get-restaurant-usecase";
import { PrismaClient } from "@prisma/client";
import { RestaurantRepositoryDataBase } from "../../RepositoryDataBase/restaurant-repository";
import { ListRestaurantUseCase } from "@/app/@core/application/usecase/restaurat/list-restaurat-usecase";

export class RestaurantUseCaseFactory {
  static listRestaurantFactory(prisma: PrismaClient) {
    const repositoryRestaurant = new RestaurantRepositoryDataBase(prisma);
    return new ListRestaurantUseCase(repositoryRestaurant);
  }
}
