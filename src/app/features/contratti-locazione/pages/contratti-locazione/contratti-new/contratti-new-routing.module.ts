import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrattiNewPage } from './contratti-new.page';
import { patrimonioResolver } from 'src/app/core/resolvers/patrimonio.resolver';
import { intestatariResolver, unitaImmobiliareResolver } from 'src/app/core/resolvers/contratti.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContrattiNewPage,
    resolve: { patrimonioResolver , unitaImmobiliareResolver , intestatariResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrattiNewPageRoutingModule {}
