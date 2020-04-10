import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
declare let Stripe; // : stripe.StripeStatic;

@Component({
  selector: 'os-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef;

  stripe; // : stripe.Stripe;
  card;
  cardErrors;

  loading = false;
  confirmation;

  constructor() {}

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_4LF4x5QJ0GHVvwCNU1g3KJYV00hFrgoyrO');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  submitOrder(event) {
    console.log('submitting order', event);
  }
}
