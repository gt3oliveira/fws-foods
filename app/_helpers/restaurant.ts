import { UserFavouriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavouriteRestaurants: UserFavouriteRestaurant[],
) => {
  return userFavouriteRestaurants?.some(
    (fav) => fav.restaurantId === restaurantId,
  );
};
