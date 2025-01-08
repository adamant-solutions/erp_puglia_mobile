import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatrimonioPage} from './pages/patrimonio/patrimonio.page';
import {patrimonioResolver} from 'src/app/core/resolvers/patrimonio.resolver';

const routes: Routes = [
  {
    path: '',
    component: PatrimonioPage,
    resolve: {patrimonioResolver},
  },
  {
    path: ':id/patrimonio-details',
    loadChildren: () => import('./pages/patrimonio/patrimonio-details/patrimonio-details.module').then(m => m.PatrimonioDetailsPageModule)
  },
  {
    path: 'modifica-patrimonio/:id',
    loadChildren: () => import('./pages/patrimonio/modifica-patrimonio/modifica-patrimonio.module').then( m => m.ModificaPatrimonioPageModule)
  },
  {
    path: 'nuovo-patrimonio',
    loadChildren: () => import('./pages/patrimonio/nuovo-patrimonio/nuovo-patrimonio.module').then( m => m.NuovoPatrimonioPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrimonioRoutingModule {
}
