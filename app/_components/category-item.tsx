import Image from "next/image";
import { Category } from "../@core/domain/entities/category";

interface CategoryProps {
  category: Category;
}
const CategoryItem = ({ category }: CategoryProps) => {
  return (
    <div className="flex items-center   gap-10 rounded-lg px-6 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
