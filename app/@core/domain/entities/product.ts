import { Restaurant } from "./restaurant";

export type ProductProps = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
  createdAt: Date;
};

export class Product {
  constructor(private props: ProductProps) {}
  private restaurant: Restaurant | null = null;
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get imageUrl() {
    return this.props.imageUrl;
  }
  get price() {
    return this.props.price;
  }
  get discountPercentage() {
    return this.props.discountPercentage;
  }
  get restaurantId() {
    return this.props.restaurantId;
  }
  get categoryId() {
    return this.props.categoryId;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  calcaulateTotalPrice(): number {
    if (this.discountPercentage <= 0) return this.props.price;
    const discountAmount = this.price * (this.discountPercentage / 100);
    const priceWhihtDisconted = this.price - discountAmount;
    return priceWhihtDisconted;
  }

  associateRestaurant(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  // Método para obter o restaurante associado ao produto
  getAssociatedRestaurant(): Restaurant | null {
    return this.restaurant;
  }
}
