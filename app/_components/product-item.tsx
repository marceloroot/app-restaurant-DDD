import Image from "next/image";

import { ProductDTO } from "../@core/application/usecase/product/product-dto";

import {
  Registry,
  container,
} from "../@core/infra/containers/container-product-registry";
import { formatCurrency } from "../@core/application/service/formats/format-currency";
import { CalculatteTotalPriceUseCase } from "../@core/application/usecase/product/calcualte-total-price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: ProductDTO;
}

const ProductItem = async ({ product }: ProductItemProps) => {
  const formatter = new formatCurrency();
  const formattedPrice = formatter.execute(product.price);
  const useCase = container.get<CalculatteTotalPriceUseCase>(
    Registry.CalculatteTotalPriceUseCase,
  );
  const priceWithDiscount = await useCase.execute(product);

  const formattedDiscont = formatter.execute(priceWithDiscount);

  return (
    <div className="w-[150px] min-w-[150px] ">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {product.discountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDownIcon size={12} />
            <span className="text-xs font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>
      <h2 className="mt-2 truncate text-sm font-semibold">{product.name}</h2>
      <div className="flex items-center gap-1 ">
        <h3 className="font-semibold ">{formattedDiscont}</h3>
        {product.discountPercentage > 0 && (
          <span className="text-xs text-muted-foreground line-through">
            R$
            {formattedPrice}
          </span>
        )}
      </div>
      <span className="block text-xs text-muted-foreground">
        {product.restaurantName}
      </span>
    </div>
  );
};

export default ProductItem;
