import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'os-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
