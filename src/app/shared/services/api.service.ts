import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static baseUrl = 'http://localhost:3000/api';
  static cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${environment.CLOUDINARY_CONFIG.USER}/image/upload`;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ApiService.baseUrl}/products`);
  }

  public getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${ApiService.baseUrl}/products/${productId}`);
  }

  public createProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(`${ApiService.baseUrl}/products`, body);
  }

  public uploadImage(body): Observable<any> {
    return this.http.post(ApiService.cloudinaryBaseUrl, body, {
      observe: 'body'
    });
  }
}
