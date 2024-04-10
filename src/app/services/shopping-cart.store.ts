import { provideRouter } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ProductModel } from '../models';
import { computed } from '@angular/core';

export interface CartStore {
  products: ProductModel[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<CartStore>(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }) => ({
    addtoCart(product: ProductModel) {
      const isProductInCart = products().find((p) => p.id === product.id);
      let newProducts = [];
      if (isProductInCart) {
        isProductInCart.qty += 1;
        isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
        newProducts = [...products()];
      } else {
        newProducts = [...products(), product];
      }
      patchState(store, { products: newProducts });
    },
    removeFromCart(id: number) {
      const newProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: newProducts });
    },
    clearCart() {
      patchState(store, initialState);
    },
  }))
);
function calculateProductCount(products: ProductModel[]) {
  return products.reduce((acc, el) => acc + el.qty, 0);
}
function calculateTotalAmount(products: ProductModel[]) {
  return products.reduce((acc, el) => acc + el.price * el.qty, 0);
}
