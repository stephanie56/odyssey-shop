import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPageModule } from './product-page/product-page.module';
import { ProductListModule } from './product-list/product-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ProductPageModule, ProductListModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
