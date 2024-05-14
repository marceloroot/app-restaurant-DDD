"use client";
import Image from "next/image";

import {
  Registry,
  container,
} from "../@core/infra/containers/container-product-registry";
import { formatCurrency } from "../@core/application/service/formats/format-currency";
import { CalculatteTotalPriceUseCase } from "../@core/application/usecase/product/calcualte-total-price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { ProductWithRestaurant } from "../@core/application/usecase/product/DTO/product-with-restaurant-DTO";
import { ProductUseCaseFactory } from "../@core/infra/factory/usecase/produc-use-case";
import { db } from "../@core/infra/Prisma/prisma";

interface ProductItemProps {
  productWithRestaurant: ProductWithRestaurant;
}

const ProductItem = ({ productWithRestaurant }: ProductItemProps) => {
  const formatter = new formatCurrency();
  const formattedPrice = formatter.execute(productWithRestaurant.product.price);

  const calaculate = ProductUseCaseFactory.calculateTotalPrice(
    productWithRestaurant.product,
    db,
  );

  const formattedDiscont = formatter.execute(calaculate);

  return (
    <Link
      className="w-[150px] min-w-[150px]"
      href={`/products/${productWithRestaurant.product.id}`}
    >
      <div className="w-[150px] min-w-[150px] ">
        <div className="relative h-[150px] w-full">
          <Image
            src={productWithRestaurant.product.imageUrl}
            alt={productWithRestaurant.product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {productWithRestaurant.product.discountPercentage && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />
              <span className="text-xs font-semibold">
                {productWithRestaurant.product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
        <h2 className="mt-2 truncate text-sm font-semibold">
          {productWithRestaurant.product.name}
        </h2>
        <div className="flex items-center gap-1 ">
          <h3 className="font-semibold ">{formattedDiscont}</h3>
          {productWithRestaurant.product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formattedPrice}
            </span>
          )}
        </div>
        <span className="block text-xs text-muted-foreground">
          {productWithRestaurant.restaurant.name}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
