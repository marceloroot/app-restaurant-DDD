import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repository/category";

export class ListCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
}
