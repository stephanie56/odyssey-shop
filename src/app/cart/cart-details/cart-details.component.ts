import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { CartItem } from 'src/app/shared/models/CartItem';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { removeFromCart } from '../store/cart.actions';
import { Store } from '@ngrx/store';
import { CartState } from '../store/cart.reducer';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectNumbersOfCartItems,
  selectIsEmptyCart
} from '../store/cart.selectors';

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
@Injectable({
  providedIn: 'root'
})
export class CartDataSource extends DataSource<CartItem> {
  /** Stream of data that is provided to the table. */
  data: Observable<CartItem[]>;

  constructor(private store: Store<CartState>) {
    super();
    this.data = this.store.select(selectCartItems);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CartItem[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'os-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent {
  displayedColumns: string[] = ['product', 'quantity', 'total'];
  cartTotal$: Observable<number>;
  isEmptyCart$: Observable<boolean>;

  constructor(public dataSource: CartDataSource, private store: Store<CartState>) {
    this.cartTotal$ = this.store.select(selectCartTotalPrice);
    this.isEmptyCart$ = this.store.select(selectIsEmptyCart);
  }

  removeCartItem(id: string, quantity: number) {
    console.log(id);
    this.store.dispatch(removeFromCart({ id, quantity }));
  }
}
