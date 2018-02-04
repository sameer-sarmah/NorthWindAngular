import { Injectable } from '@angular/core';
import { Headers, Http, Response,RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { HttpParams ,HttpClient,HttpRequest,HttpResponse,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { CoreException } from './core-exception';
import { KeyValue } from './KeyValueType';


@Injectable()
export class HttpService {

  constructor(private http: Http,private httpClient: HttpClient) { }
  

  initiateRequest(method:string,url:string,params:KeyValue={},headers:KeyValue={},payload=null):Observable<any>{
    let queryParams =null
    if(typeof params ==="object"){
      queryParams = new HttpParams({
        fromObject: params
      });
    }

    const httpHeaders = new HttpHeaders(headers);
    let request;
    if(method === "GET" || method === "DELETE"){
      request = new HttpRequest(method, url, {params:queryParams,headers:headers});
    }
    else{
      request = new HttpRequest(method, url,payload, {params:queryParams,headers:httpHeaders});
    }

      return this.httpClient.request(request)
     .filter((response: HttpResponse<any>)=>{
      if(!response.body){
       return false;
      }
      else{
        return true;
      }
     })
    .map(
      (response: HttpResponse<any>) => {
        let data={};
        if(!!response.body && !!response.body.value){
          data=response.body.value;
          return Observable.of(data);
        }
        else if(!!response.body){
          data=response.body;
          return Observable.of(data);
        }
        else{
           return Observable.never();
        }
      }
    )
    .catch(
      (error: HttpErrorResponse) => {
        const status=error.status;
        const statusText=error.statusText;
        const errorText=error.message;
        const exp=new CoreException(status,statusText,errorText)
        return Observable.throw(exp);
      }
    );
  }



}
