import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();
  
  return next(request).pipe(
    finalize(() => {
      loaderService.hideLoader();
    })
  );
};
