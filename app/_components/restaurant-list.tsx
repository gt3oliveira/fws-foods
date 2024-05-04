import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { RestaurantItem } from "./restaurant-item";
import { authOptions } from "../_lib/auth";

export async function RestaurantList() {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavouriteRestaurants = await db.userFavouriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 pb-1 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userId={session?.user.id}
          userFavouriteRestaurants={userFavouriteRestaurants}
        />
      ))}
    </div>
  );
}
