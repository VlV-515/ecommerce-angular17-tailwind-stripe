import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { ProductModel } from '../models';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public arrProducts = signal<ProductModel[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apriProducts.url;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  public getProducts(): void {
    this._http
      .get<ProductModel[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        map((products: ProductModel[]) =>
          products.map((product: ProductModel) => ({ ...product, qty: 1 }))
        ),
        tap((products: ProductModel[]) => this.arrProducts.set(products))
      )
      .subscribe();
  }

  public getProductById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<ProductModel>(
        this._http
          .get<ProductModel>(`${this._endPoint}/products/${id}`)
          .pipe(map((product: ProductModel) => ({ ...product, qty: 1 })))
      )
    );
  }
}
