
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

export const httpsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthorizationService);

  if (req.url.includes('/oauth2/token')) {
    return next(req);
  }
  const isWriteRequest = ['POST', 'PUT', 'DELETE'].includes(req.method);
  
  return authService.ensureTokenIsValid(isWriteRequest).pipe(
    switchMap(token => {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      
      return next(modifiedReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
    
            authService.clearTokens();
            
            return authService.ensureTokenIsValid(isWriteRequest).pipe(
              switchMap(newToken => {
                const retryReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                });
                return next(retryReq);
              })
            );
          }
          throw error;
        })
      );
    })
  );
};