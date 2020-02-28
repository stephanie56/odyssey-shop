import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/models/Product';
import { Observable } from 'rxjs';
import { GET_PRODUCTS_URL, UPLOAD_IMAGE_URL } from 'src/app/shared/services/api/api-urls';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {
  constructor(private http: HttpClient) {}

  public createProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(GET_PRODUCTS_URL, body);
  }

  public uploadImage(body): Observable<any> {
    return this.http.post(UPLOAD_IMAGE_URL, body, {
      observe: 'body'
    });
  }
}
