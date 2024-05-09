import { PrismaClient } from "@prisma/client";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repository/product";
import { ProductDTO } from "../../application/usecase/product/product-dto";

export class ProductHttpRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}
  async findAll(): Promise<ProductDTO[]> {
    const products = await this.prisma.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
      take: 10,
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

  calcualteTotalPrice(prodcutDto: ProductDTO): Promise<number> {
    const product = new Product({
      id: prodcutDto.id,
      categoryId: prodcutDto.categoryId,
      createdAt: prodcutDto.createdAt,
      description: prodcutDto.description,
      discountPercentage: prodcutDto.discountPercentage,
      imageUrl: prodcutDto.imageUrl,
      name: prodcutDto.name,
      price: Number(prodcutDto.price),
      restaurantId: prodcutDto.restaurantId,
    });
    return Promise.resolve(product.calcaulateTotalPrice());
  }
}
