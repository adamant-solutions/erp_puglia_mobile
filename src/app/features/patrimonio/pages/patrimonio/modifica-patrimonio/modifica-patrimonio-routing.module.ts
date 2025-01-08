import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaPatrimonioPage } from './modifica-patrimonio.page';
import { patrimonioByIdResolver } from 'src/app/core/resolvers/patrimonio.resolver';

const routes: Routes = [
  {
    path: '',
    component: ModificaPatrimonioPage,
    resolve: { patrimonioByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaPatrimonioPageRoutingModule {}
