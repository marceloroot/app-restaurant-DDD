import Image from "next/image";
import { Restaurant } from "../@core/domain/entities/restaurant";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../@core/application/service/formats/format-currency";
import { Button } from "./ui/button";
interface RestaurantProps {
  restaurant: Restaurant;
}
const RestaurantItem = ({ restaurant }: RestaurantProps) => {
  const formatter = new formatCurrency();
  const formattedDeliveryFee = formatter.execute(restaurant.deliveryFee);
  return (
    <div className="min-w-[260px] max-w-[260px] ">
      <div className="relative h-[136px] w-full ">
        <Image
          src={restaurant.imageUrl}
          fill
          alt={restaurant.name}
          className="rounded-lg object-cover "
        />

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-foreground">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold ">5.0</span>
        </div>

        <Button
          size="icon"
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-muted-foreground"
        >
          <HeartIcon className="fill-white" size={16} />
        </Button>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
      </div>
      <div className="mt-1 flex items-center gap-3">
        <div className="flex gap-1">
          <BikeIcon className="text-primary" size={13} />
          <span className="text-xs text-muted-foreground">
            {restaurant.deliveryFee === 0
              ? "Entrega grátis"
              : `${formattedDeliveryFee}`}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <TimerIcon className="text-primary" size={13} />
          <span className="text-xs text-muted-foreground">
            {restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
