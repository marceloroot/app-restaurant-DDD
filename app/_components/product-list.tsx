import { ListProductUseCase } from "../@core/application/usecase/product/list-product-usecase";
import { Registry, container } from "../@core/infra/container-product-registry";
import ProductItem from "./product-item";

const ProducList = async () => {
  const useCase = container.get<ListProductUseCase>(
    Registry.ListProductUseCase,
  );
  const products = await useCase.execute();

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block  ">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProducList;
