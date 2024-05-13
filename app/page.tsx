import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import CategoreList from "./_components/category-list";
import ProducList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

import PromoBanner from "./_components/prono-baner";
import RestaurantList from "./_components/restaurant.list";
import { ProductUseCaseFactory } from "./@core/infra/factory/usecase/produc-use-case";
import { db } from "./_lib/prisma";
export default async function Home() {
  const listProductWithRestaurant =
    ProductUseCaseFactory.createListProductWithRestaurantUseCase(db);
  const productsWhithRestaurant = await listProductWithRestaurant.execute();

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoreList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner alt="Banner da Promoção" src="/promo-banner-01.png" />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2>Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProducList productWithRestaurants={productsWhithRestaurant} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          alt="Banner da Promoção apartir de 19"
          src="/promo-banner-02.png"
        />
      </div>
      <div className="mb-4 space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2>Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
