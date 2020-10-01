import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private API = environment.API_CONTACT_URL;

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let enrichRequest: HttpRequest<unknown> = request;
    if (request.url.includes(this.API)) {
      enrichRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getTokenFromLocalStorage())
      });
    }
    return next.handle(enrichRequest);
  }
}
