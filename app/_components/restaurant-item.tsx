"use client";
import { Restaurant, UserFavouriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { useSession } from "next-auth/react";
import { isRestaurantFavorited } from "../_helpers/restaurant";
import { useToggleFavoriteRestaurant } from "../_hooks/toggle-favorite-restaurant";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavouriteRestaurants: UserFavouriteRestaurant[];
}

export function RestaurantItem({
  restaurant,
  className,
  userFavouriteRestaurants,
}: RestaurantItemProps) {
  const { data } = useSession();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavouriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  return (
    <div className={cn("min-w-[266px] max-w-[266px] space-y-3", className)}>
      <div className="relative h-[136px] w-full">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
            quality={100}
          />
        </Link>

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="text-xs font-semibold">5.0</span>
        </div>

        {data?.user.id && (
          <Button
            size={"icon"}
            className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
            onClick={handleFavoriteClick}
          >
            <HeartIcon size={14} className="fill-white" />
          </Button>
        )}
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
    </div>
  );
}
