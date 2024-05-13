"use client";
import { formatCurrency } from "@/app/@core/application/service/formats/format-currency";
import { ProductWithRestaurant } from "@/app/@core/application/usecase/product/DTO/product-with-restaurant-DTO";
import { ProductProps } from "@/app/@core/domain/entities/product";
import { RestauranttProps } from "@/app/@core/domain/entities/restaurant";
import DiscountBadge from "@/app/_components/discont-badge";
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
  product: ProductProps;
  restaurant: RestauranttProps;
  priceWithDiscount: number;
}

const ProductDetails = ({
  product,
  restaurant,
  priceWithDiscount,
}: ProductDetailPrpos) => {
  const [quatity, setQuantity] = useState(1);
  const formatter = new formatCurrency();
  const formattedPrice = formatter.execute(product.price);
  const formattedWithDiscont = formatter.execute(priceWithDiscount);
  const formattedDelifee = formatter.execute(restaurant.deliveryFee);

  const handleIncreaseQunatityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQunatityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  return (
    <div className="p-5">
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground ">
          {restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>
      {/* Preço do produto e quantidade */}
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{formattedWithDiscont}</h2>
            {/* preço original */}
            {product.discountPercentage && (
              <DiscountBadge discountPercentage={product.discountPercentage} />
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
      <Card className="mt-6 flex justify-around py-3">
        {/* custo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {restaurant.deliveryFee > 0 ? (
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
          {restaurant.deliveryFee > 0 ? (
            <p className="text-xs font-semibold">{formattedDelifee}</p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
