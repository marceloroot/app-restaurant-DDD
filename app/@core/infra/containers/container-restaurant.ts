import { Container } from "inversify";
import { RestaurantRepositoryDataBase } from "../RepositoryDataBase/restaurant-repository";
import { ListRestaurantUseCase } from "../../application/usecase/restaurat/list-restaurat-usecase";
import { db } from "../Prisma/prisma";

export const Registry = {
  PrismaAdpter: Symbol.for("PrismaAdpter"),
  ContainerRegistry: Symbol.for("ContainerRegistry"),
  ListRestaurantUseCase: Symbol.for("ListRestaurantUseCase"),
};

export const containerRestaurant = new Container();

containerRestaurant.bind(Registry.PrismaAdpter).toConstantValue(db);

containerRestaurant
  .bind(Registry.ContainerRegistry)
  .toDynamicValue((context) => {
    return new RestaurantRepositoryDataBase(
      context.container.get(Registry.PrismaAdpter),
    );
  });

containerRestaurant
  .bind(Registry.ListRestaurantUseCase)
  .toDynamicValue((context) => {
    return new ListRestaurantUseCase(
      context.container.get(Registry.ContainerRegistry),
    );
  });
