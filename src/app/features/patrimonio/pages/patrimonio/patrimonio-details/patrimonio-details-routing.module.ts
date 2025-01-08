import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PatrimonioDetailsPage} from './patrimonio-details.page';
import { patrimonioByIdResolver } from 'src/app/core/resolvers/patrimonio.resolver';

const routes: Routes = [
  {
    path: '',
    component: PatrimonioDetailsPage,
    resolve: { patrimonioByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrimonioDetailsPageRoutingModule {
}
