import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import CategoreList from "./_components/category-list";
import Image from "next/image";
import ProducList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { ListProductUseCase } from "@/app/@core/application/usecase/product/list-product-usecase";
import {
  Registry,
  container,
} from "@/app/@core/infra/container-product-registry";
export default async function Home() {
  const useCase = container.get<ListProductUseCase>(
    Registry.ListProductUseCase,
  );
  const products = await useCase.execute();
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30 porcento de desconto nas pizzas"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
        />
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
        <ProducList products={products} />
      </div>
    </>
  );
}
