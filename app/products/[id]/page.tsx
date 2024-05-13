import { formatCurrency } from "@/app/@core/application/service/formats/format-currency";
import {
  Registry,
  container,
} from "@/app/@core/infra/containers/container-product-registry";
import { notFound } from "next/navigation";
import ProductImage from "./_component/product-image";

import { ProductUseCaseFactory } from "@/app/@core/infra/factory/usecase/produc-use-case";
import { db } from "@/app/@core/infra/Prisma/prisma";
import { CalculatteTotalPriceUseCase } from "@/app/@core/application/usecase/product/calcualte-total-price";
import ProductDetails from "./_component/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const getProductWithRestaurant =
    ProductUseCaseFactory.createGetProductWithRestaurantUseCase(db);
  const productWithRestaurant = await getProductWithRestaurant.execute(id);
  if (!productWithRestaurant) return notFound();
  const useCase = container.get<CalculatteTotalPriceUseCase>(
    Registry.CalculatteTotalPriceUseCase,
  );
  const priceWithDiscount = await useCase.execute(
    productWithRestaurant.product,
  );
  const formatter = new formatCurrency();
  const formattedPrice = formatter.execute(productWithRestaurant.product.price);
  const formattedWithDiscont = formatter.execute(priceWithDiscount);

  return (
    <div>
      <ProductImage product={productWithRestaurant.product} />
      <ProductDetails
        product={productWithRestaurant.product}
        restaurant={productWithRestaurant.restaurant}
        priceWithDiscount={priceWithDiscount}
      />
    </div>
  );
};

export default ProductPage;
