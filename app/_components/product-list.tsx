import { ProductDTO } from "../@core/application/usecase/product/product-dto";
import ProductItem from "./product-item";
interface ProductListProps {
  products: ProductDTO[];
}

const ProducList = async ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block  ">
      {products.map((product: ProductDTO) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProducList;
