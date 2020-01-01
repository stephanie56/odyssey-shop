import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${ApiService.baseUrl}/products/${productId}`);
  }
}
