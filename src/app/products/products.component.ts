import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/Product';
import { filter, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'os-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  productsObs$: Observable<Product[]>;

  ngOnInit() {
    this.productsObs$ = this.apiService.getProducts().pipe(shareReplay(1));
  }
}
