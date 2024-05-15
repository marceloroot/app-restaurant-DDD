import { GetProductWithRestaurantUseCase } from "@/app/@core/application/usecase/product/get-product-with-restaurant-use-case";
import { ProductHttpRepository } from "../../RepositoryDataBase/product-repository";
import { RestaurantRepositoryDataBase } from "../../RepositoryDataBase/restaurant-repository";
import { PrismaClient } from "@prisma/client/extension";
import { ListProductUseCase } from "@/app/@core/application/usecase/product/list-product-usecase";
import { ProductProps } from "@/app/@core/domain/entities/product";
import { CalculatteTotalPriceUseCase } from "@/app/@core/application/usecase/product/calcualte-total-price";
import { ListProducByCategoryIdRestaurantIdtUseCase } from "@/app/@core/application/usecase/product/list-product-by-categoryId-restaurantId";

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

  static calculateTotalPrice(
    product: ProductProps,
    prisma: PrismaClient,
  ): number {
    const repositoryProduct = new ProductHttpRepository(prisma);
    const calculate = new CalculatteTotalPriceUseCase(repositoryProduct);
    return calculate.execute(product);
  }

  static createListProductByCategoryIdRestaurantIdtUseCase(
    prisma: PrismaClient,
  ): ListProducByCategoryIdRestaurantIdtUseCase {
    const repositoryProduct = new ProductHttpRepository(prisma);
    const repositoryRestaurant = new RestaurantRepositoryDataBase(prisma);
    return new ListProducByCategoryIdRestaurantIdtUseCase(
      repositoryProduct,
      repositoryRestaurant,
    );
  }
}
