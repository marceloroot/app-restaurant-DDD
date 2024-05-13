import { Product, ProductProps } from "@/app/@core/domain/entities/product";
import {
  Restaurant,
  RestauranttProps,
} from "@/app/@core/domain/entities/restaurant";

export class ProductWithRestaurant {
  constructor(
    public product: ProductProps,
    public restaurant: RestauranttProps,
  ) {}
}
