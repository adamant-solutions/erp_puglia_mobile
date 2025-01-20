import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContrattiLocazionePage} from './pages/contratti-locazione/contratti-locazione.page';
import { contrattiResolver } from 'src/app/core/resolvers/contratti.resolver';

const routes: Routes = [
  {path: "", component: ContrattiLocazionePage,resolve: {contrattiResolver} },
  {
    path: ':id/contratti-details',
    loadChildren: () => import('./pages/contratti-locazione/contratti-details/contratti-details.module').then( m => m.ContrattiDetailsPageModule)
  },
  {
    path: 'nuovo-contratto',
    loadChildren: () => import('./pages/contratti-locazione/contratti-new/contratti-new.module').then( m => m.ContrattiNewPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContrattiLocazioneRoutingModule {
}
