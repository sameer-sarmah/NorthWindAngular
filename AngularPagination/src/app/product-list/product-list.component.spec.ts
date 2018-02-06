
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpClient,HttpHandler } from '@angular/common/http';
import { Injector } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ProductHttpService } from '../services/product-http.service';
import { ProductService } from '../services/product.service';
import { HttpModule } from '@angular/http';


describe('Product List', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let   httpClientInjector;
  let   httpSvcInjector;
  let httpSvc; 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule,HttpModule],
        declarations: [ ProductListComponent ],
        providers:[ProductHttpService,HttpService,ProductService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });

  it('product count',
      inject([HttpClient, HttpTestingController,ProductHttpService,HttpService], 
            (http: HttpClient, backend: HttpTestingController,productSvc:ProductHttpService,httpSvc:HttpService) => 
          {

            const header={"Accept":"application/json","Content-Type":"application/json"};
            const queryParam={"top":"10","skip":"5","format":"json"};
            
            spyOn(httpSvc,"initiateRequest");
            productSvc.getProductCount();
            expect(httpSvc.initiateRequest).toHaveBeenCalledWith( "GET","https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/Products/$count"
            );
          }
        )
   );

  
  it('product list',
  inject([HttpClient, HttpTestingController,ProductHttpService,HttpService], 
    (http: HttpClient, backend: HttpTestingController,productSvc:ProductHttpService,httpSvc:HttpService) => {

    const headers={"Accept":"application/json","Content-Type":"application/json"};
    const queryParam={"$top":"10","$skip":"5","$format":"json"};
    
    spyOn(httpSvc,"initiateRequest");
    productSvc.getProductList(10,5,headers);
    expect(httpSvc.initiateRequest).toHaveBeenCalledWith( "GET","https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/Products"
    ,queryParam,headers);

  }));

});
