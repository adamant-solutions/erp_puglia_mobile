import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnagraficaRoutingModule} from './anagrafica-routing.module';
import {IonicModule} from '@ionic/angular';
import {AnagraficaPage} from './pages/anagrafica/anagrafica.page';
import {FooterComponent} from 'src/app/shared/footer/footer.component';

import { environment } from 'src/environments/environment';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';

@NgModule({
  declarations: [AnagraficaPage],
  imports: [
    CommonModule,
    IonicModule,
    AnagraficaRoutingModule,
    FooterComponent,
  ],
  providers:[
     AnagraficaService,
   { provide: 'anagraficaUrl', useValue: environment.anagraficaUrl },]
})
export class AnagraficaModule {
}
