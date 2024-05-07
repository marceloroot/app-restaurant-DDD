import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import CategoreList from "./_components/category-list";
import Image from "next/image";

export default function Home() {
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
    </>
  );
}
