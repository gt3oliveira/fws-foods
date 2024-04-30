import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discout = Number(product.price) * (product.discountPercentage / 100);
  return Number(product.price) - discout;
};

export const formatCurrency = (value: number): string => {
  return (
    "R$" +
    Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value)
  );
};
