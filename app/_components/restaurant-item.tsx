import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantItem({ restaurant, className }: RestaurantItemProps) {
  return (
    <Link
      className={cn("min-w-[266px] max-w-[266px] space-y-3", className)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover"
          quality={100}
        />

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="text-xs font-semibold">5.0</span>
        </div>

        <Button
          size={"icon"}
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
        >
          <HeartIcon size={14} className="fill-white" />
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega Grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex gap-1">
            <TimerIcon size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
