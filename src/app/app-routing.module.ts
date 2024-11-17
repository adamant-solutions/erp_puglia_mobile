import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patrimonio',
    pathMatch: 'full'
  },
  /*{
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }, */
  {
    path: 'patrimonio',
    loadChildren: () => import('./features/patrimonio/patrimonio.module').then(m => m.PatrimonioModule)
  },
  {
    path: 'contabilita',
    loadChildren: () => import('./features/contabilita/contabilita.module').then(m => m.ContabilitaModule)
  },
  {
    path: 'anagrafica',
    loadChildren: () => import('./features/anagrafica/anagrafica.module').then(m => m.AnagraficaModule)
  },
  {
    path: 'contratti-locazione',
    loadChildren: () => import('./features/contratti-locazione/contratti-locazione.module').then(m => m.ContrattiLocazioneModule)
  },
  {
    path: 'profilo',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
