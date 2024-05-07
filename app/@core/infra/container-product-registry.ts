import { Container } from "inversify";
import { db } from "./Prisma/prisma";
import { ProductHttpRepository } from "./gateways/product-repository";
import { ListProductUseCase } from "../application/product/list-product-usecase";

export const Registry = {
  PrismaAdpter: Symbol.for("PrismaAdpter"),
  ContainerRegistry: Symbol.for("ContainerRegistry"),
  ListProductUseCase: Symbol.for("ListProductUseCase"),
};

export const container = new Container();

container.bind(Registry.PrismaAdpter).toConstantValue(db);

container.bind(Registry.ContainerRegistry).toDynamicValue((context) => {
  return new ProductHttpRepository(
    context.container.get(Registry.PrismaAdpter),
  );
});

container.bind(Registry.ListProductUseCase).toDynamicValue((context) => {
  return new ListProductUseCase(
    context.container.get(Registry.ContainerRegistry),
  );
});
