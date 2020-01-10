import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PageGuard } from '../shared/guards/page.guard';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [PageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
