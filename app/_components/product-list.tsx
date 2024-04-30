import { Prisma } from "@prisma/client";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export async function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 pb-1 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}