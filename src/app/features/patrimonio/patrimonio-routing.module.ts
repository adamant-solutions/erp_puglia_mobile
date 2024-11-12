import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatrimonioPage } from './pages/patrimonio/patrimonio.page';
import { patrimonioResolver } from 'src/app/core/resolvers/patrimonio.resolver';

const routes: Routes = [
  {
    path: '',
    component: PatrimonioPage,
    resolve: {  patrimonioResolver },
    runGuardsAndResolvers : 'pathParamsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrimonioRoutingModule { }
