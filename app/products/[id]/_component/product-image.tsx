"use client";
import { ProductWithRestaurant } from "@/app/@core/application/usecase/product/DTO/product-with-restaurant-DTO";
import { Product, ProductProps } from "@/app/@core/domain/entities/product";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: ProductProps;
}
const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="relative  h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-background text-foreground hover:text-white"
        size="icon"
        onClick={() => {
          handleBackClick();
        }}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
