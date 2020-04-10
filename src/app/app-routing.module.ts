import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) },
  {
    path: 'products/create',
    loadChildren: () => import('./create-product/create-product.module').then((m) => m.CreateProductModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
  },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule) },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
