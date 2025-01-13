import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContrattiService } from '../services/contratti.service';


export interface ContrattiSearchParams {
  pagina?: number;
  //params ... 
}

export const contrattiResolver: ResolveFn<any> = (route, state, contrattiService: ContrattiService = inject(ContrattiService)) => {
  
  const searchParams: ContrattiSearchParams = {
    pagina: route.params['pagina'] ? +route.params['pagina'] : 0,
  };
  return contrattiService.getContrattiData(searchParams)
}

export const contrattiByIdResolver: ResolveFn<any> = 
(route, state, contrattiService: ContrattiService = inject(ContrattiService)) => {
  const ID  = route.params['id'];
  return contrattiService.getContrattiById(ID)
};