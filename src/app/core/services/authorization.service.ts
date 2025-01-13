import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly tokenExpiryTimeSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly tokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private http = inject(HttpClient);

  constructor(@Inject('accessTokenUrl') private AccessTokenUrl: string) {}

  private fetchToken(isWriteAccess: boolean): Observable<string> {
    const authHeader = isWriteAccess
      ? 'Basic d3JpdGVyOnNlY3JldC13cml0ZXI='
      : 'Basic cmVhZGVyOnNlY3JldC1yZWFkZXI=';
    const body = `grant_type=client_credentials&scope=${isWriteAccess ? 'erp:write' : 'erp:read'}`;
    console.log("Auth service: ", `${isWriteAccess}` , body)

    const headers = new HttpHeaders({
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<any>(this.AccessTokenUrl, body, { headers }).pipe(
      switchMap(response => {
        this.tokenSubject.next(response.access_token);
        const expiryTime = Date.now() + response.expires_in * 1000;
        this.tokenExpiryTimeSubject.next(expiryTime);
        return of(response.access_token);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

/*   private isTokenExpired(): boolean {
    const expiryTime = this.tokenExpiryTimeSubject.value;
    return expiryTime ? Date.now() > expiryTime : true;
  } */

  ensureTokenIsValid(isWriteAccess: boolean): Observable<string> {
 //   console.log("ensure token is valid: " , isWriteAccess)
      return this.fetchToken(isWriteAccess);
  }

  clearTokens(): void {
    this.tokenSubject.next('');
    this.tokenExpiryTimeSubject.next(0);
  }
}
