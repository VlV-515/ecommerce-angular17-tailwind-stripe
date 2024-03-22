import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./products.component');
    },
  },
  {
    path: ':id',
    loadComponent() {
      return import('../product-details/product-details.component');
    },
  },
];

export default routes;
