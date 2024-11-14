import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilitaRoutingModule } from './contabilita-routing.module';
import { ContabilitaPage } from './pages/contabilita/contabilita.page';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/shared/footer/footer.component';


@NgModule({
  declarations: [ContabilitaPage],
  imports: [
    CommonModule,
    IonicModule,
    ContabilitaRoutingModule,
    FooterComponent
  ]
})
export class ContabilitaModule { }
