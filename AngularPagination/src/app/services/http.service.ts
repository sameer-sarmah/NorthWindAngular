import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class HttpService {
  private svcURL="https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/Products";
  private productCount:number;
  constructor(private http: Http) { }

  makeODataCall(url:string){
    const headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.get(url)
    .map(
      (response: Response) => {
        return response.json();
      }
    )
    .catch(
      (error: Response) => {
        return Observable.throw('Something went wrong');
      }
    );
  }

  getProductList(top:number,skip:number):Observable<any>{
    let paginationQuery="?$top="+top+"&skip="+skip+"&$format=json";
    return this.makeODataCall(this.svcURL+paginationQuery)

  }


  getProductCount():Observable<any>{
    return this.makeODataCall(this.svcURL+"/$count");
  }

}
