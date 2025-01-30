import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrattiDetailsPage } from './contratti-details.page';
import { contrattiByIdResolver, unitaImmobiliareResolver } from 'src/app/core/resolvers/contratti.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContrattiDetailsPage,
    resolve: { contrattiByIdResolver , unitaImmobiliareResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrattiDetailsPageRoutingModule {}
