import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductService } from './services/product.service';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ProductService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
