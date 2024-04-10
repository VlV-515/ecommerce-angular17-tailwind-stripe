import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { CartStore } from '../../services/shopping-cart.store';
import { ProductModel } from '../../models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  private readonly cartStore = inject(CartStore);
  private readonly productsSvc = inject(ProductService);
  arrProductos = this.productsSvc.arrProducts;

  onAddToCart(product: ProductModel): void {
    this.cartStore.addtoCart(product);
  }
}
