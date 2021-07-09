import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser!: string;

  constructor(private http: HttpClient) {}

  login(user: { userName: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.url_token}`, user);
  }

  isLoggedIn(): boolean{
    return !!this.getJwtToken();
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser( userName: string, tokens: string): void{
    this.loggedUser = userName;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: string): void {
    localStorage.setItem(this.JWT_TOKEN, tokens);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
