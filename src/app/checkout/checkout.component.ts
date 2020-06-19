import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PaymentService } from '../create-product/services/payment.service';
declare let Stripe; // : stripe.StripeStatic;

@Component({
  selector: 'os-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('cardElement') cardElement: ElementRef;

  stripe;
  card;
  cardErrors;

  loading = false;
  confirmation;

  constructor(private paymentService: PaymentService) {}

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
    console.log(event);
    // const payload = { cart, card };
    // this.paymentService.createPaymentIntent(payload);
  }
}
