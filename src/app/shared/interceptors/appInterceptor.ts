import { HandleErrorService } from './../services/handle-error.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptor implements HttpInterceptor {
  constructor(private error: HandleErrorService) {}
  token: string = '';
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Accept: `application/json`,
        'access-control-allow-origin': '*',
      },
    });
    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + localStorage.getItem('token'),
          'Accept-Language': 'en',
        },
      });
    }
    return next.handle(request).pipe() as any;
  }
}
