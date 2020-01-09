import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductRoutingModule } from './create-product-routing.module';
import { CreateProductComponent } from './create-product.component';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [CommonModule, CreateProductRoutingModule]
})
export class CreateProductModule {}
