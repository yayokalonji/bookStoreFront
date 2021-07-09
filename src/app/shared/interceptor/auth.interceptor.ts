import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private user: { userName: string, password: string } = { userName: 'jackson', password: 'kalonji'};

  constructor( public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()){
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)){
        return this.handle401Error(request, next);
      }else {
        console.log(error);
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: any | null): HttpRequest<any> {
    return request.clone({
      headers : new HttpHeaders({
        Authorization: `${token}`
      })
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);
    return this.authService.login(this.user).pipe(
    switchMap((token: any) => {
      this.isRefreshing = false;
      this.refreshTokenSubject.next(token.token);
      return next.handle(this.addToken(request, token.token));
    }));
  }
}

