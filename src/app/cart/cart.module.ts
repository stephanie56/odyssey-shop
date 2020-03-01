import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';

import { CartRoutingModule } from './cart-routing.module';
import { MiniCartComponent } from './mini-cart/mini-cart.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import * as fromCart from './store/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';

@NgModule({
  declarations: [MiniCartComponent, CartDetailsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    CdkTableModule,
    CartRoutingModule,
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    EffectsModule.forFeature([CartEffects])
  ],
  exports: [MiniCartComponent, CartDetailsComponent]
})
export class CartModule {}
