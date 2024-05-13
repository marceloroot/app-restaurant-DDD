import { formatCurrency } from "@/app/@core/application/service/formats/format-currency";
import { CalculatePercentage } from "@/app/@core/application/usecase/caculate-discont/calculate-percentage";
import { CalculatteTotalPriceUseCase } from "@/app/@core/application/usecase/product/calcualte-total-price";
import { ProductHttpRepository } from "@/app/@core/infra/RepositoryDataBase/product-repository";
import {
  Registry,
  container,
} from "@/app/@core/infra/containers/container-product-registry";
import { PrismaClient } from "@prisma/client";
import { Product } from "@/app/@core/domain/entities/product";
import { ProductUseCaseFactory } from "@/app/@core/infra/factory/usecase/produc-use-case";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      product: {
        findMany: jest.fn(() => [
          {
            id: "1",
            name: "Sample Product",
            description: "Sample Description",
            imageUrl: "sample.jpg",
            price: 10,
            discountPercentage: 20,
            restaurantId: "3",
            categoryId: "1",
            createdAt: new Date(),
          },
          {
            id: "2",
            name: "Sample Product 1",
            description: "Sample Description 1",
            imageUrl: "sample1.jpg",
            price: 19.99,
            discountPercentage: 10,
            restaurantId: "4",
            categoryId: "1",
            createdAt: new Date(),
          },
        ]),
        findUnique: jest.fn((args) => {
          const products = [
            {
              id: "1",
              name: "Sample Product",
              description: "Sample Description",
              imageUrl: "sample.jpg",
              price: 10,
              discountPercentage: 20,
              restaurantId: "3",
              categoryId: "1",
              createdAt: new Date(),
            },
            {
              id: "2",
              name: "Sample Product 1",
              description: "Sample Description 1",
              imageUrl: "sample1.jpg",
              price: 19.99,
              discountPercentage: 10,
              restaurantId: "4",
              categoryId: "1",
              createdAt: new Date(),
            },
          ];

          return products.find((product) => product.id === args.where.id);
        }),
      },
      restaurant: {
        findMany: jest.fn(() => [
          {
            id: "3",
            name: "Pizza House",
            imageUrl:
              "https://utfs.io/f/a73ec63a-7fc8-4a23-8d03-62debee79e6a-5p2j3.png",
            deliveryFee: 10,
            deliveryTimeMinutes: 20,
          },
          {
            id: "4",
            name: "The Burguer Queen",
            imageUrl:
              "https://utfs.io/f/d9834f2e-bc37-4c64-981b-cabf03018322-p3apy8.png",
            deliveryFee: 0,
            deliveryTimeMinutes: 45,
          },
        ]),
        findUnique: jest.fn((args) => {
          const restaurants = [
            {
              id: "3",
              name: "The Burguer Queen",
              imageUrl:
                "https://utfs.io/f/d9834f2e-bc37-4c64-981b-cabf03018322-p3apy8.png",
              deliveryFee: 0,
              deliveryTimeMinutes: 45,
            },
            {
              id: "4",
              name: "The Burguer Queen",
              imageUrl:
                "https://utfs.io/f/d9834f2e-bc37-4c64-981b-cabf03018322-p3apy8.png",
              deliveryFee: 0,
              deliveryTimeMinutes: 45,
            },
          ];
          return restaurants.find(
            (restaurant) => restaurant.id === args.where.id,
          );
        }),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

describe("Product Tests", () => {
  let products: Product[];
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const repository = new ProductHttpRepository(prisma);
    products = await repository.findAll();
  });
  it("should return an array of Products", async () => {
    const listProductWithRestaurant =
      ProductUseCaseFactory.createListProductWithRestaurantUseCase(prisma);
    const listProducts = await listProductWithRestaurant.execute();
    expect(listProducts?.length).toBe(2);
    expect(listProducts[0].restaurant.name).toBe("The Burguer Queen");
  });
  it("should return an discont porcent", async () => {
    const useCase = container.get<CalculatePercentage>(
      Registry.CalculateDiscontPorcentage,
    );
    const priceWithDiscount = await useCase.execute(10, 20);
    expect(priceWithDiscount).toBe(8);
  });

  it("should returns the correct currency formatting", async () => {
    const formatter = new formatCurrency();
    const formattedValue = formatter.execute(39);
    expect(formattedValue).toBe("R$ 39,00");
  });

  it("should return an total price in product", async () => {
    const useCase = container.get<CalculatteTotalPriceUseCase>(
      Registry.CalculatteTotalPriceUseCase,
    );
    const priceWithDiscount = await useCase.execute(products[0]);
    expect(priceWithDiscount).toBe(8);
  });

  it("should return a unique product with restaurant", async () => {
    const getProductWithRestaurant =
      ProductUseCaseFactory.createGetProductWithRestaurantUseCase(prisma);
    const productId = "1";
    const productWithRestaurant =
      await getProductWithRestaurant.execute(productId);

    expect(productWithRestaurant?.restaurant.name).toBe("The Burguer Queen");
    expect(productWithRestaurant?.product.name).toBe("Sample Product");
  });
});
