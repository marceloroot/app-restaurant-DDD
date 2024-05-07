import { PrismaClient } from "@prisma/client";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repository/product";

export class ProductHttpRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}
  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
    });
    if (products.length <= 0) return [];

    return products.map(
      (data) =>
        new Product({
          id: data.id,
          categoryId: data.categoryId,
          createdAt: data.createdAt,
          description: data.description,
          discountPercentage: data.discountPercentage,
          imageUrl: data.imageUrl,
          name: data.name,
          price: Number(data.price),
          restaurantId: data.restaurantId,
        }),
    );
  }
}
