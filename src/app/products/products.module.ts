import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DropdownModule } from 'mario-lib';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent],
  imports: [CommonModule, ProductsRoutingModule, DropdownModule, MatButtonModule]
})
export class ProductsModule {}
