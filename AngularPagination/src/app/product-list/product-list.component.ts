import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs/Observable';
import { ProductHttpService } from '../services/product-http.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
private productList:any[]=[];
private productCount:number=Number.MAX_VALUE;
private growingThreshold:number=10;
constructor(private svc:ProductService,private http:ProductHttpService) { 

  }

  ngOnInit() {
  //this.productCount=this.svc.getProductCount();  
  //this.productList=this.svc.getProductList(this.growingThreshold,this.productList.length-1);
  this.getProductCountHTTP();
  this.getProductListHTTP();
  }

  fetchMoreProducts(){
    let products=[];
    if((this.productList.length+this.growingThreshold)<=this.productCount){
     products=this.svc.getProductList(this.growingThreshold,this.productList.length-1);
    }
    else{
     products=this.svc.getProductList(this.productCount-this.productList.length,this.productList.length-1); 
    }
    this.productList=this.productList.concat(products);
  }

  getProductCountHTTP(){
  this.http.getProductCount().subscribe(
    (count) => {
      console.log(count.value);
      if(typeof count.value === "number"){
        this.productCount = +count.value;
      }

    },
    (error) => console.log(error)
  );
  }

  getProductListHTTP(){
     let obs:Observable<any>;
    if((this.productList.length+this.growingThreshold)<=this.productCount){
      obs=this.http.getProductList(this.growingThreshold,this.productList.length);
      }
      else{
        obs=this.http.getProductList(this.productCount-this.productList.length,this.productList.length); 
      }
      obs.subscribe(
      (data) => {
         let products=data.value;
         console.log(products);
         if(!!products)
         this.productList=this.productList.concat(products);
      },
      (error) => console.log(error)
    );
  }

}
