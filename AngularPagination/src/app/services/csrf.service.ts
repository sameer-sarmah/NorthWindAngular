import { Injectable } from '@angular/core';
import { HttpParams ,HttpClient,HttpRequest,HttpResponse,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { CoreException } from './core-exception';
import { CSRFCache } from './csrf-cache';
@Injectable()
export class CsrfService {
  private csrfToken=null; 
  
  constructor(private httpClient: HttpClient,private csrfCache:CSRFCache) {
   //this.fetchCSRFToken();
   console.log("CsrfService");
  }

  fetchCSRFToken():Observable<any>{
  const url="api/1.0/user";
  const headerObj={"X-CSRF-Token":"fetch"}
  const httpHeaders = new HttpHeaders(headerObj);
  let request = new HttpRequest("GET", url, {headers:httpHeaders});
  return this.httpClient.request(request)
  .map(
    (response: HttpResponse<any>) => {
      if(response.headers.has("X-CSRF-Token")){
        this.csrfToken=response.headers.get("X-CSRF-Token");
        this.csrfCache.setCSRFToken(this.csrfToken);
        Observable.of(this.csrfToken);
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
