import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscoutBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

export function DiscoutBadge({ product }: DiscoutBadgeProps) {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
}
