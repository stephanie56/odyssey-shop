import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { CATEGORY_BASE_URL } from './api/api-urls';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<any>(CATEGORY_BASE_URL);
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<any>(`${CATEGORY_BASE_URL}/${id}`);
  }
}
