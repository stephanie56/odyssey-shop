import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PAYMENT_BASE_URL } from 'src/app/shared/services/api/api-urls';

interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  public createPaymentIntent(body): Observable<PaymentIntent> {
    return this.http.post<any>(PAYMENT_BASE_URL, body);
  }
}
