import { Suspense } from "react";
import { Restaurants } from "./_components/restaurants";
import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";

export default async function RestaurantsPage() {
  const session = await getServerSession();
  const userFavoriteRestaurants = await db.userFavouriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
}
