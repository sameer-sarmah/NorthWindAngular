import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductHttpService {
  private svcURL="https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/Products";
  private productCount:number;
  constructor(private httpService:HttpService) { }
  getProductList(top:number,skip:number):Observable<any>{
    let paginationQuery="?$top="+top+"&skip="+skip+"&$format=json";
    const params={"$top":top.toString(),"$skip":skip.toString(),"$format":"json"};
    return this.httpService.initiateRequest("GET",this.svcURL,params);

  }


  getProductCount():Observable<any>{
    return this.httpService.initiateRequest("GET",this.svcURL+"/$count");
  }
}
