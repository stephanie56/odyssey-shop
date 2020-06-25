import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PaymentService, PaymentIntent } from '../shared/services/payment.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartState } from '../cart/store/cart.reducer';
import { selectCartTotalPrice, selectCartItems } from '../cart/store/cart.selectors';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { CartItem } from '../shared/models/CartItem';
import { clearCart } from '../cart/store/cart.actions';

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
  isCardComplete$ = new BehaviorSubject(false);
  cardErrors$ = new BehaviorSubject('');

  stripe;
  card;

  loading = false;

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
    this.card.addEventListener('change', (event) => {
      const { error, elementType, complete } = event;
      if (elementType === 'card' && complete) {
        this.isCardComplete$.next(true);
      }
      if (error && error.message) {
        this.cardErrors$.next(error.message);
      } else {
        this.cardErrors$.next('');
      }
    });
  }

  submitOrder(event) {
    event.preventDefault();
    this.cartItems$
      .pipe(
        take(1), // should not trigger api calls after the cart state is updated
        map((cartItems: CartItem[]) => {
          return cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          }));
        }),
        switchMap(
          (items): Observable<PaymentIntent> => {
            return this.paymentService.createPaymentIntent({
              items,
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
        this.successMessage$.next('Payment Successful!');
        this.store.dispatch(clearCart());
      });
  }
}
