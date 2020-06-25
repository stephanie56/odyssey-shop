import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';

const routes: Routes = [
  {
    path: '',
    component: AllCategoriesComponent,
  },
  {
    path: ':id',
    component: CategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
