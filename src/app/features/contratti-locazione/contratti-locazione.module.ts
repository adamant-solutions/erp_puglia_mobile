import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContrattiLocazioneRoutingModule} from './contratti-locazione-routing.module';
import {IonicModule} from '@ionic/angular';
import {ContrattiLocazionePage} from './pages/contratti-locazione/contratti-locazione.page';
import {FooterComponent} from 'src/app/shared/footer/footer.component';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';


@NgModule({
  declarations: [ContrattiLocazionePage],
  imports: [
    CommonModule,
    IonicModule,
    ContrattiLocazioneRoutingModule,
    FooterComponent,
    CapitalizePipe
  ],
  providers: []
})
export class ContrattiLocazioneModule {
}
