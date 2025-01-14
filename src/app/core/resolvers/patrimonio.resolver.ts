import {ResolveFn} from '@angular/router';
import {PatrimonioService} from '../services/patrimonio.service';
import {inject} from '@angular/core';
import { StatoDisponibilita } from '../models/patrimonio.model';


export interface PatrimonioSearchParams {
  pagina?: number;
  indirizzo?: string;
  comune?: string;
  statoDisponibilita?: StatoDisponibilita | string
  //params ... 
}


export const patrimonioResolver: ResolveFn<any> = (route, state, patrimonioService: PatrimonioService = inject(PatrimonioService)) => {
  
  const searchParams: PatrimonioSearchParams = {
    pagina: route.params['pagina'] ? +route.params['pagina'] : 0,
    indirizzo: route.params['indirizzo'] || '',
    comune: route.params['comune'] || '',
    statoDisponibilita: route.params['statoDisponibilita'] || '',
  };

  return patrimonioService.getPatrimonioData(searchParams)
}

export const patrimonioByIdResolver: ResolveFn<any> = 
(route, state, patrimonioService: PatrimonioService = inject(PatrimonioService)) => {
  const ID  = route.params['id'];
  return patrimonioService.getPatrimonioById(ID)
};

