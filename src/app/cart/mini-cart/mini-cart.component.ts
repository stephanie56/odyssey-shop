import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { selectNumbersOfCartItems } from '../store/cart.selectors';
import { Store } from '@ngrx/store';
import { CartState } from '../store/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'os-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCartComponent implements OnInit {
  numOfCartItems$: Observable<number>;

  constructor(private store: Store<CartState>) {}

  ngOnInit(): void {
    this.numOfCartItems$ = this.store.select(selectNumbersOfCartItems);
  }
}
