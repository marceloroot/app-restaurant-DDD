import { ListCategoryUseCase } from "../@core/application/usecase/category/list-category-usecase";
import {
  Registry,
  container,
} from "../@core/infra/containers/container-registry";

import { db } from "@/app/_lib/prisma";
import CategoryItem from "./category-item";

const CategoreList = async () => {
  //pegar categoria do banco de dados
  //renderizar um item para cada categoria

  const useCase = container.get<ListCategoryUseCase>(
    Registry.ListCategoryUseCase,
  );
  const categorys = await useCase.execute();

  return (
    <div className="grid grid-cols-2 gap-3">
      {categorys.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoreList;
