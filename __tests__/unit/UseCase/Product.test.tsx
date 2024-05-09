import { formatCurrency } from "@/app/@core/application/service/formats/format-currency";
import { CalculatePercentage } from "@/app/@core/application/usecase/caculate-discont/calculate-percentage";
import { CalculatteTotalPriceUseCase } from "@/app/@core/application/usecase/product/calcualte-total-price";
import { ListProductUseCase } from "@/app/@core/application/usecase/product/list-product-usecase";
import { ProductDTO } from "@/app/@core/application/usecase/product/product-dto";
import { ProductHttpRepository } from "@/app/@core/infra/RepositoryDataBase/product-repository";
import {
  Registry,
  container,
} from "@/app/@core/infra/container-product-registry";
import { PrismaClient } from "@prisma/client";

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
            restaurantId: "1",
            categoryId: "1",
            createdAt: new Date(),
            restaurant: { name: "Don Marteli" },
          },
          {
            id: "2",
            name: "Sample Product 1",
            description: "Sample Description 1",
            imageUrl: "sample1.jpg",
            price: 19.99,
            discountPercentage: 10,
            restaurantId: "1",
            categoryId: "1",
            createdAt: new Date(),
            restaurant: { name: "Don Marteli" },
          },
        ]),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

describe("Product Tests", () => {
  let products: ProductDTO[];
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const repository = new ProductHttpRepository(prisma);
    products = await repository.findAll();
  });
  it("should return an array of Products", async () => {
    const useCase = container.get<ListProductUseCase>(
      Registry.ListProductUseCase,
    );
    const productBase = await useCase.execute();

    expect(productBase.length).toBe(2);
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
    console.log("Formatted value:", formattedValue);
    expect(formattedValue).toBe("R$ 39,00");
  });

  it("should return an total price in product", async () => {
    const useCase = container.get<CalculatteTotalPriceUseCase>(
      Registry.CalculatteTotalPriceUseCase,
    );
    const priceWithDiscount = await useCase.execute(products[0]);
    console.log("productssss", priceWithDiscount);
    expect(priceWithDiscount).toBe(8);
  });
});
