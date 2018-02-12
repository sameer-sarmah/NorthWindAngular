import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductService } from './services/product.service';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './services/http.interceptor';
import { CsrfService } from './services/csrf.service';
import { CSRFCache } from './services/csrf-cache';
import { ProductHttpService } from './services/product-http.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PaginationDirective } from './directives/pagination.directive'
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    PaginationDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [ProductService,HttpService,HttpHeaderInterceptor,CsrfService,CSRFCache,ProductHttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
