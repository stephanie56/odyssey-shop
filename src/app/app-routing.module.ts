import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) },
  {
    path: 'products/create',
    loadChildren: () => import('./create-product/create-product.module').then((m) => m.CreateProductModule)
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
