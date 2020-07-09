import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REFRESH_TOKEN_URL } from './api-urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public refreshToken(): Observable<any> {
    return this.http.post<any>(REFRESH_TOKEN_URL);
  }
}
