import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PaymentService, PaymentIntent } from '../create-product/services/payment.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartState } from '../cart/store/cart.reducer';
import { selectCartTotalPrice, selectCartItems } from '../cart/store/cart.selectors';
import { switchMap, map, combineLatest } from 'rxjs/operators';
declare let Stripe; // : stripe.StripeStatic;

@Component({
  selector: 'os-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('cardElement') cardElement: ElementRef;
  cartTotal$: Observable<number>;
  cartItems$: Observable<any>;
  successMessage$ = new BehaviorSubject('');

  stripe;
  card;
  cardErrors;

  loading = false;
  confirmation;

  constructor(private paymentService: PaymentService, private store: Store<CartState>) {
    this.cartTotal$ = this.store.select(selectCartTotalPrice);
    this.cartItems$ = this.store.select(selectCartItems);
  }

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_vh4hDDrxbwYNihczwDhuxnaY00R5VWJqnS');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
  }

  ngAfterViewInit() {
    this.card.mount(this.cardElement.nativeElement);
    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  submitOrder(event) {
    event.preventDefault();
    this.cartTotal$
      .pipe(
        switchMap(
          (cartTotal): Observable<PaymentIntent> => {
            return this.paymentService.createPaymentIntent({
              cartTotal,
            });
          }
        ),
        map((res) => res.clientSecret),
        switchMap((secret): any =>
          this.stripe.confirmCardPayment(secret, {
            payment_method: {
              card: this.card,
            },
          })
        )
      )
      .subscribe((res) => {
        console.log(res);
        this.successMessage$.next('Payment Successful!');
      });
  }
}
