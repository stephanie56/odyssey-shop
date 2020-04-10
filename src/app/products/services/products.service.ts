import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { GET_PRODUCTS_URL } from 'src/app/shared/services/api/api-urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${GET_PRODUCTS_URL}`);
  }

  public getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${GET_PRODUCTS_URL}/${productId}`);
  }
}
