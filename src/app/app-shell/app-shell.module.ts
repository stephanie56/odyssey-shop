import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastheadComponent } from './masthead/masthead.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartModule } from '../cart/cart.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MastheadComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, CartModule],
  exports: [MastheadComponent]
})
export class AppShellModule {}
