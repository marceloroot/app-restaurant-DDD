import { ListRestaurantUseCase } from "../@core/application/usecase/restaurat/list-restaurat-usecase";
import {
  containerRestaurant,
  Registry,
} from "../@core/infra/containers/container-restaurant";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const container = containerRestaurant.get<ListRestaurantUseCase>(
    Registry.ListRestaurantUseCase,
  );
  const restaurants = await container.execute();

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block  ">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
