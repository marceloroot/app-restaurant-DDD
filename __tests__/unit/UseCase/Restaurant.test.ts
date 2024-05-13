import { RestaurantUseCaseFactory } from "@/app/@core/infra/factory/usecase/restaurant-use-case";
import { PrismaClient } from "@prisma/client";
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      restaurant: {
        findMany: jest.fn(() => [
          {
            id: "73f605ff-52f9-425a-b558-0ef29c1ed0f4",
            name: "Pizza House",
            imageUrl:
              "https://utfs.io/f/a73ec63a-7fc8-4a23-8d03-62debee79e6a-5p2j3.png",
            deliveryFee: 10,
            deliveryTimeMinutes: 20,
          },
          {
            id: "73f605ff-52f9-425a-b558-0ef29c1ed0f4",
            name: "The Burguer Queen",
            imageUrl:
              "https://utfs.io/f/d9834f2e-bc37-4c64-981b-cabf03018322-p3apy8.png",
            deliveryFee: 0,
            deliveryTimeMinutes: 45,
          },
        ]),
        findUnique: jest.fn((params) => {
          const id = params.where.id;
          if (id === "73f605ff-52f9-425a-b558-0ef29c1ed0f4") {
            return {
              id: "73f605ff-52f9-425a-b558-0ef29c1ed0f4",
              name: "The Burguer Queen",
              imageUrl:
                "https://utfs.io/f/d9834f2e-bc37-4c64-981b-cabf03018322-p3apy8.png",
              deliveryFee: 0,
              deliveryTimeMinutes: 45,
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
  const prisma = new PrismaClient();
  it("should return an array of restaurant", async () => {
    const restaurantsUseCase =
      RestaurantUseCaseFactory.listRestaurantFactory(prisma);
    const restaurants = await restaurantsUseCase.execute();
    expect(restaurants.length).toBe(2);
  });
  it("should return a  restaurant", async () => {});
});
