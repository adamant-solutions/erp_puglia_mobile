import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnagraficaDetailsPage } from './anagrafica-details.page';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagraficaDetailsPageRoutingModule {}
