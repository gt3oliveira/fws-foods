"use client";
import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import { useToggleFavoriteRestaurant } from "@/app/_hooks/toggle-favorite-restaurant";
import { Restaurant, UserFavouriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">;
  userFavouriteRestaurants: UserFavouriteRestaurant[];
}
export function RestaurantImage({
  restaurant,
  userFavouriteRestaurants,
}: RestaurantImageProps) {
  const { data } = useSession();
  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavouriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        size={"icon"}
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size={"icon"}
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
}
