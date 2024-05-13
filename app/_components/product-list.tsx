import { Product } from "@prisma/client";
import ProductItem from "./product-item";
import { ProductWithRestaurant } from "../@core/application/usecase/product/DTO/product-with-restaurant-DTO";
interface ProductListProps {
  productWithRestaurants: ProductWithRestaurant[];
}

const ProducList = async ({ productWithRestaurants }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block  ">
      {productWithRestaurants.map(
        (productWithRestaurant: ProductWithRestaurant) => (
          <ProductItem
            key={productWithRestaurant.product.id}
            productWithRestaurant={productWithRestaurant}
          />
        ),
      )}
    </div>
  );
};

export default ProducList;
