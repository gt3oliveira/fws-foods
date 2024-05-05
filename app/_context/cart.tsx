/* eslint-disable no-unused-vars */
"use client";
import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalDiscounts: number;
  totalPrice: number;
  totalQuantity: number;
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalDiscounts: 0,
  totalPrice: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return (
        Number(product.restaurant.deliveryFee) +
        (acc + calculateProductTotalPrice(product) * product.quantity)
      );
    }, 0);
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts =
    subTotalPrice - (totalPrice - Number(products[0]?.restaurant.deliveryFee));

  function clearCart() {
    return setProducts([]);
  }

  const decreaseProductQuantity: ICartContext["decreaseProductQuantity"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const increaseProductQuantity: ICartContext["increaseProductQuantity"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductFromCart: ICartContext["removeProductFromCart"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const addProductToCart: ICartContext["addProductToCart"] = ({
    product,
    emptyCart,
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subTotalPrice,
        totalDiscounts,
        totalPrice,
        totalQuantity,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
