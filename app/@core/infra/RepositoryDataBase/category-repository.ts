import { CategoryRepository } from "../../domain/repository/category";
import { Category } from "../../domain/entities/category";
import { PrismaClient } from "@prisma/client";

export class CategoryHttpRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Category[]> {
    const categorys = await this.prisma.category.findMany();

    if (categorys.length <= 0) return [];

    return categorys.map(
      (data) =>
        new Category({
          id: data.id,
          name: data.name,
          imageUrl: data.imageUrl,
          createAt: data.createdAt,
        }),
    );
  }

  async findById(id: string): Promise<Category> {
    const res = await this.prisma.category.findFirst({
      where: { id },
    });
    if (!res) throw new Error(`Categoria com o ID ${id} não encontrada`);
    return new Category({
      id: res.id,
      name: res.name,
      imageUrl: res.imageUrl,
      createAt: res.createdAt,
    });
  }
}
