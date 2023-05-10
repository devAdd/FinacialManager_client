import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService : AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const user = this.authenticationService.userValue;
    const isLoggedIn = user?.jwtToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if(isLoggedIn && isApiUrl){
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${user.jwtToken}`
        }
      })
    }

    return next.handle(request);
  }
}
