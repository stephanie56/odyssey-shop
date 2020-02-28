import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static baseUrl = 'http://localhost:3000/api';
  static cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${environment.CLOUDINARY_CONFIG.USER}/image/upload`;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ProductsService.baseUrl}/products`);
  }

  public getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${ProductsService.baseUrl}/products/${productId}`);
  }
}
