import {ResolveFn} from '@angular/router';
import {PatrimonioService} from '../services/patrimonio.service';
import {inject} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';

export const patrimonioResolver: ResolveFn<any> = (route, state, patrimonioService: PatrimonioService = inject(PatrimonioService)): Observable<{}> => {
  return patrimonioService.getPatrimonioData().pipe(
    catchError((err) => {
      return of('Error: ' + err);
    })
  );
}
