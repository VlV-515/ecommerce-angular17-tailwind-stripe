import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductModel } from '../../models';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterModule, SlicePipe, CurrencyPipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  public product = input.required<ProductModel>();
  @Output() public onAddToCartEvnt = new EventEmitter<ProductModel>();

  onAddToCart(): void {
    this.onAddToCartEvnt.emit(this.product());
  }
}
