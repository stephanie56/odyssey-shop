import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'os-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
