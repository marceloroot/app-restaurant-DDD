import { ListRestaurantUseCase } from "@/app/@core/application/usecase/restaurat/list-restaurat-usecase";
import {
  Registry,
  containerRestaurant,
} from "@/app/@core/infra/containers/container-restaurant";

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
            id: "5225e835-f154-4c9f-831b-33b4ed89dcfd",
            name: "The Burguer Queen",
            imageUrl:
              "https://utfs.io/f/d9834f2e-bc37-4c64-981b-cabf03018322-p3apy8.png",
            deliveryFee: 0,
            deliveryTimeMinutes: 45,
          },
        ]),
        findFirst: jest.fn((params) => {
          const id = params.where.id;
          if (id === "1") {
            return {
              id: "5225e835-f154-4c9f-831b-33b4ed89dcfd",
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
  it("should return an array of restaurant", async () => {
    const useCase = containerRestaurant.get<ListRestaurantUseCase>(
      Registry.ListRestaurantUseCase,
    );
    const restaurants = await useCase.execute();
    console.log("Restaurants", restaurants);
    expect(restaurants.length).toBe(2);
  });
});
