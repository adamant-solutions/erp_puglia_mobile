import { ResolveFn } from '@angular/router';
import { AnagraficaService } from '../services/anagrafica.service';
import { inject } from '@angular/core';

export interface AnagraficaSearchParams {
  pagina?: number;
  codiceFiscale?: string;
  nome?: string;
  cognome?: string;
}

export const anagraficaResolver: ResolveFn<any> = 
(route, state, anagraficaService: AnagraficaService = inject(AnagraficaService)) => {

  const searchParams: AnagraficaSearchParams = {
    pagina: route.params['pagina'] ? +route.params['pagina'] : 0,
    codiceFiscale: route.params['codiceFiscale'] || '',
    nome: route.params['nome'] || '',
    cognome: route.params['cognome'] || ''
  };
  return anagraficaService.getAnagraficaListPaginated(searchParams)
};

export const anagraficaByIdResolver: ResolveFn<any> = 
(route, state, anagraficaService: AnagraficaService = inject(AnagraficaService)) => {
  const ID  = route.params['id'];
  return anagraficaService.getAnagraficaById(ID)
};
