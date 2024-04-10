import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductModel } from '../models';
import { map } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.stripe.serverURL;

  public onProceedToPay(products: ProductModel[]): any {
    return this.http
      .post(`${this.url}/checkout`, { items: products })
      .pipe(
        map(async (res: any) => {
          const stripe = await loadStripe(environment.stripe.apiKey);
          stripe?.redirectToCheckout({ sessionId: res.id });
        })
      )
      .subscribe({
        error: (error) => {
          console.error(error);
        },
      });
  }
}
