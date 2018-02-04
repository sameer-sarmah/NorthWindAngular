import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CsrfService } from './csrf.service';
import { CSRFCache } from './csrf-cache';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  
  constructor(private csrfCache:CSRFCache){
    
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headerObj={
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    };
    const headers = new HttpHeaders(headerObj); 
    const csrfToken:string=this.csrfCache.getCSRFToken();
    if(!!csrfToken){
      headerObj["X-CSRF-Token"]=csrfToken;
    }
    request=request.clone({headers:headers});
    return next.handle(request);
  }
}