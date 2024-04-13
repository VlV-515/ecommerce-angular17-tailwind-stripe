import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ProductModel } from '../models';
import { computed, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  withMethods(({ products, ...store }, toastSvc = inject(ToastrService)) => ({
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
      toastSvc.success('Product added to cart', 'Cart');
      patchState(store, { products: newProducts });
    },
    removeFromCart(id: number) {
      const newProducts = products().filter((product) => product.id !== id);
      toastSvc.info('Product removed from cart', 'Cart');
      patchState(store, { products: newProducts });
    },
    clearCart() {
      toastSvc.info('Cart cleared', 'Cart');
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
