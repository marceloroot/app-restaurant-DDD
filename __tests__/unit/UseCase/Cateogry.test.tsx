import { ListCategoryUseCase } from "@/app/@core/application/usecase/category/list-category-usecase";
import {
  Registry,
  container,
} from "@/app/@core/infra/containers/container-registry";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      category: {
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
        findFirst: jest.fn((params) => {
          const id = params.where.id;
          if (id === "1") {
            return {
              id: "1",
              name: "Category 1",
              imageUrl: "image1.jpg",
              createdAt: new Date(),
            };
          } else {
            return null;
          }
        }),
      },
    })),
  };
});

describe("findAll function", () => {
  it("should return an array of categories", async () => {
    const useCase = container.get<ListCategoryUseCase>(
      Registry.ListCategoryUseCase,
    );
    const categories = await useCase.execute();
    expect(categories.length).toBe(2);
  });
});
