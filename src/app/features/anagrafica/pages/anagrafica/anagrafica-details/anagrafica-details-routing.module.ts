import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnagraficaDetailsPage} from './anagrafica-details.page';
import { anagraficaByIdResolver } from 'src/app/core/resolvers/anagrafica.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaDetailsPage,
    resolve : { anagraficaByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagraficaDetailsPageRoutingModule {
}
