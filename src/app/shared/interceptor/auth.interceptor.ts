import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private user: { userName: string; password: string } = {
    userName: environment.user,
    password: environment.key,
  };

  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 403)
        ) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(
    request: HttpRequest<any>,
    token: any | null
  ): HttpRequest<any> {
    return request.clone({
      headers: new HttpHeaders({
        Authorization: `${token}`,
      }),
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.login(this.user).pipe(
      switchMap((token: any) => {
        return next.handle(this.addToken(request, token.token));
      })
    );
  }
}
