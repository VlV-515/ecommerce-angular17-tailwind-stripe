import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';
import { ProductModel } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public arrProducts = signal<ProductModel[]>([]);
  private readonly http = inject(HttpClient);

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
    return this.http.get<ProductModel>(
      `${environment.apriProducts.url}/products/${id}`
    );
  }
}
