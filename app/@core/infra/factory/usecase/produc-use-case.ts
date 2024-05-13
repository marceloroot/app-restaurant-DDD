import { GetProductWithRestaurantUseCase } from "@/app/@core/application/usecase/product/get-product-with-restaurant-use-case";
import { ProductHttpRepository } from "../../RepositoryDataBase/product-repository";
import { RestaurantRepositoryDataBase } from "../../RepositoryDataBase/restaurant-repository";
import { PrismaClient } from "@prisma/client/extension";
import { ListProductUseCase } from "@/app/@core/application/usecase/product/list-product-usecase";

export class ProductUseCaseFactory {
  static createGetProductWithRestaurantUseCase(
    prisma: PrismaClient,
  ): GetProductWithRestaurantUseCase {
    const repositoryProduct = new ProductHttpRepository(prisma);
    const repositoryRestaurant = new RestaurantRepositoryDataBase(prisma);
    return new GetProductWithRestaurantUseCase(
      repositoryProduct,
      repositoryRestaurant,
    );
  }
  static createListProductWithRestaurantUseCase(
    prisma: PrismaClient,
  ): ListProductUseCase {
    const repositoryProduct = new ProductHttpRepository(prisma);
    const repositoryRestaurant = new RestaurantRepositoryDataBase(prisma);
    return new ListProductUseCase(repositoryProduct, repositoryRestaurant);
  }
}
