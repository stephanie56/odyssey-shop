import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'products/:id',
    loadChildren: () => import('./product-page/product-page.module').then((mod) => mod.ProductPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./product-list/product-list.module').then((mod) => mod.ProductListModule)
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
