import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

export const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  async function handleFavoriteClick() {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos!"
          : "Restaurante favoritado com sucesso!",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.warning("Este restaurante já está favoritado.");
    }
  }

  return { handleFavoriteClick };
};
