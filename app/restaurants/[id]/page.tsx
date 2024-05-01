import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantImage } from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { DeliveryInfo } from "@/app/_components/delivery-info";
import { ProductList } from "@/app/_components/product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          name: "asc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            take: 10,
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="pb-5">
      <RestaurantImage restaurant={restaurant} />
      <div className="relative z-10 -mt-6 rounded-tl-3xl rounded-tr-3xl bg-white px-5">
        <div className="flex items-center justify-between pt-5">
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-semibold">{restaurant.name}</span>
          </div>

          <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
            <span className="text-xs font-semibold text-white">5.0</span>
          </div>
        </div>

        <DeliveryInfo restaurant={restaurant} />

        <div className="mt-3 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[167px] rounded-lg bg-gray-200 text-center"
            >
              <span className="text-sm text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <h2 className="mb-4 mt-6 font-semibold">Mais Pedidos</h2>
      </div>

      <ProductList products={restaurant.products} />

      {restaurant.categories.map((category) => (
        <>
          <div key={category.id} className="mt-6 space-y-4 px-5">
            <h2 className="mb-4 mt-6 font-semibold">{category.name}</h2>
          </div>

          <ProductList products={category.products} />
        </>
      ))}
    </div>
  );
}
