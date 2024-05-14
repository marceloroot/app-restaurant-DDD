import { ProductProps } from "@/app/@core/domain/entities/product";
import { RestauranttProps } from "@/app/@core/domain/entities/restaurant";

export type ProductWithRestaurant = {
  product: ProductProps;
  restaurant: RestauranttProps;
};
