import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContabilitaPage} from './pages/contabilita/contabilita.page';

const routes: Routes = [{
  path: '',
  component: ContabilitaPage
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilitaRoutingModule {
}
