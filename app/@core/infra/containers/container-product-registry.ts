import { Container } from "inversify";
import { db } from "../Prisma/prisma";
import { ProductHttpRepository } from "../RepositoryDataBase/product-repository";
import { ListProductUseCase } from "../../application/usecase/product/list-product-usecase";
import { CalculatePercentage } from "../../application/usecase/caculate-discont/calculate-percentage";
import { CalculatteTotalPriceUseCase } from "../../application/usecase/product/calcualte-total-price";

export const Registry = {
  PrismaAdpter: Symbol.for("PrismaAdpter"),
  ContainerRegistry: Symbol.for("ContainerRegistry"),
  ListProductUseCase: Symbol.for("ListProductUseCase"),
  CalculateDiscontPorcentage: Symbol.for("CalculateDiscontPorcentage"),
  CalculatteTotalPriceUseCase: Symbol.for("CalculatteTotalPriceUseCase"),
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

container.bind(Registry.CalculateDiscontPorcentage).toDynamicValue(() => {
  return new CalculatePercentage();
});

container
  .bind(Registry.CalculatteTotalPriceUseCase)
  .toDynamicValue((context) => {
    return new CalculatteTotalPriceUseCase(
      context.container.get(Registry.ContainerRegistry),
    );
  });
