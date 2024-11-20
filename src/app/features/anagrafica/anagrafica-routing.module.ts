import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnagraficaPage} from './pages/anagrafica/anagrafica.page';
import { anagraficaResolver } from 'src/app/core/resolvers/anagrafica.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnagraficaPage,
    resolve : { anagraficaResolver }
  },
  {
    path: 'anagrafica-details/:id',
    loadChildren: () => import('./pages/anagrafica/anagrafica-details/anagrafica-details.module').then(m => m.AnagraficaDetailsPageModule)
  },
  {
    path: 'nuova-anagrafica',
    loadChildren: () => import('./pages/anagrafica/nuova-anagrafica/nuova-anagrafica.module').then( m => m.NuovaAnagraficaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnagraficaRoutingModule {
}
