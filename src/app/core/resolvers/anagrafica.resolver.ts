import { ResolveFn } from '@angular/router';
import { AnagraficaService } from '../services/anagrafica.service';
import { inject } from '@angular/core';

export const anagraficaResolver: ResolveFn<any> = 
(route, state, anagraficaService: AnagraficaService = inject(AnagraficaService)) => {
  const pagina  = route.params['page'] || 0;
  return anagraficaService.getAnagraficaList(pagina)
};


