import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AllCategoriesComponent } from './all-categories/all-categories.component';

@NgModule({
  imports: [CommonModule, CategoriesRoutingModule],
  declarations: [CategoriesComponent, AllCategoriesComponent],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
