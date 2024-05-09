export interface ProductDTO {
  id: string;
  categoryId: string;
  createdAt: Date;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  name: string;
  price: number;
  restaurantId: string;
  restaurantName: string;
}
