"use client";
import { formatCurrency } from "@/app/@core/application/service/formats/format-currency";
import { ProductWithRestaurant } from "@/app/@core/application/usecase/product/DTO/product-with-restaurant-DTO";
import { ProductProps } from "@/app/@core/domain/entities/product";
import { RestauranttProps } from "@/app/@core/domain/entities/restaurant";
import DiscountBadge from "@/app/_components/discont-badge";
import ProducList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailPrpos {
  priceWithDiscount: number;
  productWhitRestaurant: ProductWithRestaurant;
  productComplementary: ProductWithRestaurant[];
}

const ProductDetails = ({
  productWhitRestaurant,
  priceWithDiscount,
  productComplementary,
}: ProductDetailPrpos) => {
  const [quatity, setQuantity] = useState(1);
  const formatter = new formatCurrency();
  const formattedPrice = formatter.execute(productWhitRestaurant.product.price);
  const formattedWithDiscont = formatter.execute(priceWithDiscount);
  const formattedDelifee = formatter.execute(
    productWhitRestaurant.restaurant.deliveryFee,
  );
  const handleIncreaseQunatityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQunatityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  return (
    <div className="py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={productWhitRestaurant.product.imageUrl}
            alt={productWhitRestaurant.product.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground ">
          {productWhitRestaurant.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">
        {productWhitRestaurant.product.name}
      </h1>
      {/* Preço do produto e quantidade */}
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{formattedWithDiscont}</h2>
            {/* preço original */}
            {productWhitRestaurant.product.discountPercentage && (
              <DiscountBadge
                discountPercentage={
                  productWhitRestaurant.product.discountPercentage
                }
              />
            )}
          </div>
          <p className="text-sm text-muted-foreground">De: {formattedPrice}</p>
        </div>
        <div>
          {/* quantidade */}
          <div className="flex items-center gap-3 ">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQunatityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quatity}</span>
            <Button size="icon" onClick={handleIncreaseQunatityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* Dados da entrega */}
      <Card className="mt-6 flex justify-around px-5 py-3">
        {/* custo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {productWhitRestaurant.restaurant.deliveryFee > 0 ? (
            <p className="text-xs font-semibold">{formattedDelifee}</p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>

        {/* tempo de entrega */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>
          {productWhitRestaurant.restaurant.deliveryFee > 0 ? (
            <p className="text-xs font-semibold">{formattedDelifee}</p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>
      </Card>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">
          {productWhitRestaurant.product.description}
        </p>
      </div>

      <div className="mt-6 space-y-3 ">
        <h3 className="px-5 font-semibold">Outros Produtos</h3>
        <ProducList productWithRestaurants={productComplementary} />
      </div>
    </div>
  );
};

export default ProductDetails;
