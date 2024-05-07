import { ListCategoryUseCase } from "@/app/@core/application/category/list-category-usecase";
import { Registry, container } from "@/app/@core/infra/container-registry";

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

  // it('should return a category when a valid ID is provided', async () => {
  //     const prisma = new PrismaClient();
  //     const categoryRepository = new CategoryHttpRepository(prisma);
  //     const useCase = new ListCategoryUseCase(categoryRepository);
  //     const categoryId = '1';
  //     const category = await useCase.findById(categoryId);
  //     expect(category).toBeDefined();
  //     // Adicione mais expectativas conforme necessário para verificar os dados da categoria
  // });

  // it('should return null when an invalid ID is provided', async () => {
  //     const prisma = new PrismaClient();
  //     const categoryRepository = new CategoryHttpRepository(prisma);
  //     const useCase = new ListCategoryUseCase(categoryRepository);
  //     const categoryId = 'invalidId';
  //     const category = await useCase.findById(categoryId);
  //     expect(category).toBeNull();
  // });
});
