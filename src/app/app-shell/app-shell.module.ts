import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastheadComponent } from './masthead/masthead.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartModule } from '../cart/cart.module';
import { RouterModule } from '@angular/router';
import { CategoriesModule } from '../categories/categories.module';

@NgModule({
  declarations: [MastheadComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, CartModule, CategoriesModule],
  exports: [MastheadComponent],
})
export class AppShellModule {}
