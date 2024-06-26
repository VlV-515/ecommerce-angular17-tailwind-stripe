import { Component, inject, signal } from '@angular/core';
import { CartStore } from '../../services/shopping-cart.store';
import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SlicePipe, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showCart = signal<boolean>(false);
  cartStore = inject(CartStore);
}
