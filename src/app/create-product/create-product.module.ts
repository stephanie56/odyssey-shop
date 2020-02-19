import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductRoutingModule } from './create-product-routing.module';
import { CreateProductComponent } from './create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [CommonModule, CreateProductRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule]
})
export class CreateProductModule {}
