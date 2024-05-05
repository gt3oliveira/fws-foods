"use client";
import { Cart } from "@/app/_components/cart";
import { DeliveryInfo } from "@/app/_components/delivery-info";
import { DiscoutBadge } from "@/app/_components/discount-badge";
import { ProductList } from "@/app/_components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const { addProductToCart, products } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  function addToCart({ emptyCart }: { emptyCart?: boolean }) {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  }

  function handleAddToCartClick() {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  }

  function handleIncreaseQuantityClick() {
    setQuantity((currencyState) => currencyState + 1);
  }

  function handleDecreaseQuantityClick() {
    setQuantity((currencyState) => {
      if (currencyState === 1) return 1;

      return currencyState - 1;
    });
  }

  return (
    <>
      <div className="relative z-10 -mt-6 rounded-tl-3xl rounded-tr-3xl bg-white pb-5">
        <div className="p-5">
          {/* RESTAURANTE */}
          <Link
            href={`/restaurants/${product.restaurantId}`}
            className="flex items-center gap-[0.375rem]"
          >
            <div className="relative h-6 w-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </span>
          </Link>

          {/* NOME DO PRODUTO */}
          <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

          {/* PREÇO DO PRODUTO E QUANTIDADE */}
          <div className="flex justify-between">
            {/* PREÇO COM DESCONTO */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {formatCurrency(calculateProductTotalPrice(product))}
                </h2>
                {product.discountPercentage > 0 && (
                  <DiscoutBadge product={product} />
                )}
              </div>
              {/* PREÇO ORIGINAL */}
              {product.discountPercentage > 0 && (
                <p className="text-sm text-muted-foreground">
                  De: {formatCurrency(Number(product.price))}
                </p>
              )}
            </div>

            {/* QUANTIDADE */}
            <div className="flex items-center gap-3 text-center">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="border border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon />
              </Button>
              <span className="w-4 text-xl">{quantity}</span>
              <Button size={"icon"} onClick={handleIncreaseQuantityClick}>
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          {/* DADOS DA ENTREGA */}
          <DeliveryInfo restaurant={product.restaurant} />

          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>
        <div className="mt-1 space-y-3">
          <h3 className="px-5 font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja apagar sua sacola?</AlertDialogTitle>
            <AlertDialogDescription>
              Você não pode realizar um pedido em um restaurante diferente do
              atual. Isso limpará seu sacola.
              <br />
              <br />
              Deseja adicionar seu pedido no restaurante escolhido?
              <br />
              <strong>{product.restaurant.name}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
