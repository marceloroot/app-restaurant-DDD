import { Container } from "inversify";
import { db } from "./Prisma/prisma";
import { CategoryHttpRepository } from "./gateways/category-repository";
import { ListCategoryUseCase } from "../application/category/list-category-usecase";

export const Registry = {
  PrismaAdpter: Symbol.for("PrismaAdpter"),
  ContainerRegistry: Symbol.for("ContainerRegistry"),
  ListCategoryUseCase: Symbol.for("ListCategoryUseCase"),
};

export const container = new Container();

container.bind(Registry.PrismaAdpter).toConstantValue(db);

container.bind(Registry.ContainerRegistry).toDynamicValue((context) => {
  return new CategoryHttpRepository(
    context.container.get(Registry.PrismaAdpter),
  );
});

container.bind(Registry.ListCategoryUseCase).toDynamicValue((context) => {
  return new ListCategoryUseCase(
    context.container.get(Registry.ContainerRegistry),
  );
});
