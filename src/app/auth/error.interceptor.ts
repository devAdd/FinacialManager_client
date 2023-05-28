import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { CustomSnackBarConfig } from '../util/snackbar/CustomSnackBarConfig';
import { _SnackBarType } from '../enums/message-template-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../util/snackbar/snackbar.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          this.authenticationService.logout();
        }
        console.log(
          'error Interceptor: ' + err.error.title + '::' + err.error.status
        );
        const config = new CustomSnackBarConfig();
        config.data = {
          message: err.error.status + '! : ' + err.error.title,
          type: _SnackBarType.error,
        };

        this.snackBar.openFromComponent(SnackbarComponent, config);
        const error = err.error.message || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }
}
