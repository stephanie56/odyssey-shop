import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/Product';
import { filter, shareReplay, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Store } from '@ngrx/store';
import { CartState } from 'src/app/cart/store/cart.reducer';
import { addToCart } from 'src/app/cart/store/cart.actions';

@Component({
  selector: 'os-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ProductsService, private store: Store<CartState>) {}

  quantity = 1;
  productObs$: Observable<Product>;
  loading: Observable<HTMLElement>;
  productId$: Observable<string> = this.route.params.pipe(
    map((p) => p.id),
    shareReplay(1)
  );

  get isAddToCartDisabled() {
    return this.productObs$.pipe(filter((product) => product.count === 0));
  }

  ngOnInit() {
    this.productObs$ = this.productId$.pipe(
      switchMap((id) => this.apiService.getProductById(id)),
      shareReplay(1)
    );
  }

  onSelectQuantity(event) {
    this.quantity = event;
  }

  addToCart(product: Product, quantity: number) {
    const item = {
      product,
      quantity,
      total: product.price * quantity
    };
    this.store.dispatch(addToCart({ item }));
  }
}
