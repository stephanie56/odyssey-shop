import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { PageGuard } from './guards/page.guard';

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
