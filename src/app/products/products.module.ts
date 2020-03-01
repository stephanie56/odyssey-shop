import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DropdownModule } from 'mario-lib';
import { MatButtonModule } from '@angular/material/button';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent],
  imports: [CommonModule, ProductsRoutingModule, DropdownModule, MatButtonModule],
  exports: [ProductsComponent, ProductDetailComponent]
})
export class ProductsModule {}
