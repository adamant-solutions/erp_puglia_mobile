import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovaAnagraficaPage } from './nuova-anagrafica.page';

const routes: Routes = [
  {
    path: '',
    component: NuovaAnagraficaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovaAnagraficaPageRoutingModule {}
