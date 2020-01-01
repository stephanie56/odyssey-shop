import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'os-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
