import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/Product';
import { ProductsService } from '../services/products.service';
import { ProductAdminService } from 'src/app/create-product/services/product-admin.service';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { selectIsAuthorizedUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'os-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  constructor(
    private apiService: ProductsService,
    private productAdminService: ProductAdminService,
    private router: Router,
    private store: Store<AuthState>
  ) {}

  productsObs$: Observable<Product[]>;
  isAuthorizedUser$: Observable<boolean>;

  ngOnInit() {
    this.productsObs$ = this.apiService.getProducts().pipe(shareReplay(1));
    this.isAuthorizedUser$ = this.store.select(selectIsAuthorizedUser);
  }

  removeProduct(productId: string) {
    this.productAdminService
      .removeProduct(productId)
      .pipe(
        finalize(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/products']);
        })
      )
      .subscribe((res) => {
        // TODO: Handle success / error messages
        console.log(res);
      });
  }
}
