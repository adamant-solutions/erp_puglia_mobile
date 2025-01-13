
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { CapacitorHttp } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  constructor(private authService: AuthorizationService) {}

  private injectAuthorizationHeader(isWriteAccess: boolean): Observable<any> {
    return from(this.authService.ensureTokenIsValid(isWriteAccess));
  }

  public capacitorHttpRequest(options: any, isWriteAccess: boolean): Observable<any> {
    return this.injectAuthorizationHeader(isWriteAccess).pipe(
      switchMap(token => {
        options.headers = options.headers || {};
        options.headers['Authorization'] = `Bearer ${token}`;
        return from(CapacitorHttp.request(options));
      })
    );
  }
}
