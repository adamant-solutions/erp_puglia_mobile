import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContrattiLocazioneRoutingModule} from './contratti-locazione-routing.module';
import {IonicModule} from '@ionic/angular';
import {ContrattiLocazionePage} from './pages/contratti-locazione/contratti-locazione.page';
import {FooterComponent} from 'src/app/shared/footer/footer.component';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [ContrattiLocazionePage],
  imports: [
    CommonModule,
    IonicModule,
    ContrattiLocazioneRoutingModule,
    FooterComponent
  ],
  providers: [
      ContrattiService,
    { provide: 'contrattiUrl', useValue: environment.contrattiUrl },
  ]
})
export class ContrattiLocazioneModule {
}
