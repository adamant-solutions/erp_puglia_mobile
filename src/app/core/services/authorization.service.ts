
import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readToken: string | null = null;
  private writeToken: string | null = null;
  private readScope: string | null = null;
  private writeScope: string | null = null;
  private http = inject(HttpClient);

  constructor(@Inject('accessTokenUrl') private AccessTokenUrl: string) {
    /* console.log("Authorization service"); */
  }

  private fetchToken(isWriteAccess: boolean): Observable<string> {
   /*  console.log("Access:", isWriteAccess ? 'write' : 'read'); */
    
    const headers = new HttpHeaders({
      'Authorization': isWriteAccess
        ? 'Basic d3JpdGVyOnNlY3JldC13cml0ZXI='
        : 'Basic cmVhZGVyOnNlY3JldC1yZWFkZXI=',
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `grant_type=client_credentials&scope=${isWriteAccess ? 'erp:write' : 'erp:read'}`;

    return this.http.post(`${this.AccessTokenUrl}`, body, { headers }).pipe(
      tap((response: any) => {
        if (isWriteAccess) {
          this.writeToken = response.access_token;
          this.writeScope = response.scope;
        } else {
          this.readToken = response.access_token;
          this.readScope = response.scope;
        }
      }),
      map(response => response.access_token)
    );
  }

  ensureTokenIsValid(isWriteAccess: boolean): Observable<string> {
    const currentToken = isWriteAccess ? this.writeToken : this.readToken;
    
    if (currentToken) {
      return of(currentToken);
    }
    
    return this.fetchToken(isWriteAccess);
  }

  getAccessToken(isWriteAccess: boolean): string | null {
    return isWriteAccess ? this.writeToken : this.readToken;
  }

  clearTokens(): void {
    this.readToken = null;
    this.writeToken = null;
    this.readScope = null;
    this.writeScope = null;
  }
}