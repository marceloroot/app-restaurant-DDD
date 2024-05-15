import { PrismaClient } from "@prisma/client";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repository/product";

export class ProductHttpRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}
  async findAll(): Promise<Product[]> {
    const productsPrisma = await this.prisma.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
      take: 10,
    });

    const products: Product[] = productsPrisma.map((data) => {
      return new Product({
        id: data.id,
        categoryId: data.categoryId,
        createdAt: data.createdAt,
        description: data.description,
        discountPercentage: data.discountPercentage,
        imageUrl: data.imageUrl,
        name: data.name,
        price: Number(data.price),
        restaurantId: data.restaurantId,
      });
    });
    return products;
  }

  calcualteTotalPrice(product: Product): number {
    return product.calcaulateTotalPrice();
  }
  async findById(id: string): Promise<Product | undefined> {
    const productPrisma = await this.prisma.product.findUnique({
      where: { id: id },
      include: {
        restaurant: true,
      },
    });

    if (!productPrisma) return undefined;
    return new Product({
      id: productPrisma.id,
      categoryId: productPrisma.categoryId,
      createdAt: productPrisma.createdAt,
      description: productPrisma.description,
      discountPercentage: productPrisma.discountPercentage,
      imageUrl: productPrisma.imageUrl,
      name: productPrisma.name,
      price: Number(productPrisma.price),
      restaurantId: productPrisma.restaurantId,
    });
  }
  async findAllByCategoryAndRestaurant(
    idCategory: string,
    idRestaurant: string,
  ): Promise<Product[]> {
    const productsPrisma = await this.prisma.product.findMany({
      where: {
        categoryId: idCategory,
        restaurantId: idRestaurant,
      },
    });

    const products: Product[] = productsPrisma.map((data) => {
      return new Product({
        id: data.id,
        categoryId: data.categoryId,
        createdAt: data.createdAt,
        description: data.description,
        discountPercentage: data.discountPercentage,
        imageUrl: data.imageUrl,
        name: data.name,
        price: Number(data.price),
        restaurantId: data.restaurantId,
      });
    });
    return products;
  }
}
