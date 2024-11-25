import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaAnagraficaPage } from './modifica-anagrafica.page';
import { anagraficaByIdResolver } from 'src/app/core/resolvers/anagrafica.resolver';

const routes: Routes = [
  {
    path: '',
    component: ModificaAnagraficaPage,
    resolve: { anagraficaByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaAnagraficaPageRoutingModule {}
