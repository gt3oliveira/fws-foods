import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { Header } from "../_components/header";
import { RestaurantItem } from "../_components/restaurant-item";

export default async function MyFavoriteRestaurants() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavouriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="mb-6 px-5">
        <h2 className="py-6 text-lg font-semibold">
          Meus Restaurantes Favoritos
        </h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={JSON.parse(JSON.stringify(restaurant))}
                userFavouriteRestaurants={userFavoriteRestaurants}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <span className="font-medium text-muted-foreground">
              Você ainda não favoritou nenhum restaurante.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
