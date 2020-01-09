import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../../shared/models/Product';
import { filter, shareReplay, map, switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'os-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  productObs$: Observable<Product>;
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
}
