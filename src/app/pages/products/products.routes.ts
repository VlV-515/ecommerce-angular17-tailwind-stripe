import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('../product-details/product-details.component'),
  },
];
export default routes;
