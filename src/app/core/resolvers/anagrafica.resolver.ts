import { ResolveFn } from '@angular/router';
import { AnagraficaService } from '../services/anagrafica.service';
import { inject } from '@angular/core';

export const anagraficaResolver: ResolveFn<any> = 
(route, state, anagraficaService: AnagraficaService = inject(AnagraficaService)) => {
  const page  = route.params['pagina'] || 1;
  return anagraficaService.getAnagraficaList(page)
};

export const anagraficaByIdResolver: ResolveFn<any> = 
(route, state, anagraficaService: AnagraficaService = inject(AnagraficaService)) => {
  const ID  = route.params['id'];
  return anagraficaService.getAnagraficaById(ID)
};
