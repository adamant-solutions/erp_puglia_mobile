import {ResolveFn} from '@angular/router';
import {PatrimonioService} from '../services/patrimonio.service';
import {inject} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';


export interface PatrimonioSearchParams {
  pagina?: number;
  zona?: string;
  //params ... 
}


export const patrimonioResolver: ResolveFn<any> = (route, state, patrimonioService: PatrimonioService = inject(PatrimonioService)): Observable<{}> => {
  
  const searchParams: PatrimonioSearchParams = {
    pagina: route.params['pagina'] ? +route.params['pagina'] : 0,
    zona: route.params['zona'] || '',
  };

  return patrimonioService.getPatrimonioData(searchParams).pipe(
    catchError((err) => {
      return of('Error: ' + err);
    })
  );
}

export const patrimonioByIdResolver: ResolveFn<any> = 
(route, state, patrimonioService: PatrimonioService = inject(PatrimonioService)) => {
  const ID  = route.params['id'];
  return patrimonioService.getPatrimonioById(ID)
};

