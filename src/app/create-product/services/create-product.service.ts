import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/models/Product';
import { Observable } from 'rxjs';
import { GET_PRODUCTS_URL, GET_IMAGE_UPLOAD_CONFIG } from 'src/app/shared/services/api/api-urls';

@Injectable({
  providedIn: 'root',
})
export class CreateProductService {
  constructor(private http: HttpClient) {}

  public getImageUploadConfig(): Observable<any> {
    return this.http.get<any>(GET_IMAGE_UPLOAD_CONFIG);
  }

  public createProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(GET_PRODUCTS_URL, body);
  }

  public uploadImage(url, body): Observable<any> {
    return this.http.post(url, body, {
      observe: 'body',
    });
  }
}
