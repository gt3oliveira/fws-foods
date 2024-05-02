import { Header } from "@/app/_components/header";
import { ProductItem } from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

export default async function CategoriesPage({
  params: { id },
}: CategoriesPageProps) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
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

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="mb-6 px-5">
        <h2 className="py-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
