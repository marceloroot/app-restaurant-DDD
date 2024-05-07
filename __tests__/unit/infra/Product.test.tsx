import { ListProductUseCase } from "@/app/@core/application/product/list-product-usecase";
import {
  Registry,
  container,
} from "@/app/@core/infra/container-product-registry";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      product: {
        findMany: jest.fn(() => [
          {
            id: "1",
            name: "Category 1",
            imageUrl: "image1.jpg",
            createdAt: new Date(),
          },
          {
            id: "2",
            name: "Category 2",
            imageUrl: "image2.jpg",
            createdAt: new Date(),
          },
        ]),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

describe("findAll function", () => {
  it("should return an array of Products", async () => {
    const useCase = container.get<ListProductUseCase>(
      Registry.ListProductUseCase,
    );
    const categories = await useCase.execute();
    expect(categories.length).toBe(2);
  });
});
