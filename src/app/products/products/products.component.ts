import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'os-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ProductsService) {}

  productsObs$: Observable<Product[]>;

  ngOnInit() {
    this.productsObs$ = this.apiService.getProducts().pipe(shareReplay(1));
  }
}
