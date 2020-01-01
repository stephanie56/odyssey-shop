import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/Product';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'os-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  productObs$: Observable<Product>;

  get isAddToCartDisabled() {
    return this.productObs$.pipe(filter((product) => product.count === 0));
  }

  ngOnInit() {
    this.productObs$ = this.apiService.getProductById('96d600ec-c2db-4dfd-a470-6dc775575e86');
  }
}
