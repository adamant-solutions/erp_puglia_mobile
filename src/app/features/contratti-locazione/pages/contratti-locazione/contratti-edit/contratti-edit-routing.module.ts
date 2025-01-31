import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrattiEditPage } from './contratti-edit.page';
import { contrattiByIdResolver, intestatariResolver, unitaImmobiliareResolver } from 'src/app/core/resolvers/contratti.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContrattiEditPage,
    resolve: { contrattiByIdResolver, unitaImmobiliareResolver, intestatariResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrattiEditPageRoutingModule {}
