import { Restaurant } from "../entities/restaurant";

export interface RestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant>;
}

export interface RestaurantRepositoryFuncionario {
  addProduct(): Promise<Restaurant[]>;
  removeProduct(id: string): Promise<Restaurant>;
}
