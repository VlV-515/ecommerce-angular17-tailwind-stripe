import { HttpClient, HttpParams } from '@angular/common/http';
import {
  EnvironmentInjector,
  Injectable,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';
import { ProductModel } from '../models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public arrProducts = signal<ProductModel[]>([]);
  private readonly http = inject(HttpClient);
  private readonly injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  public getProducts(): void {
    const params: HttpParams = new HttpParams().append('sort', 'desc');
    this.http
      .get<ProductModel[]>(`${environment.apriProducts.url}/products`)
      .pipe(tap((data: ProductModel[]) => this.arrProducts.set(data)))
      .subscribe();
  }

  public getProductById(id: number): any {
    //NOTA: Requiere el contexto para poder generar la signal
    return runInInjectionContext(this.injector, () =>
      toSignal<ProductModel>(
        this.http.get<ProductModel>(
          `${environment.apriProducts.url}/products/${id}`
        )
      )
    );
  }
}
