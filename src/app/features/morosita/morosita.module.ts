import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MorositaRoutingModule } from './morosita-routing.module';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { MorositaPage } from './morosita/morosita.page';


@NgModule({
  declarations: [MorositaPage],
  imports: [
    CommonModule,
    MorositaRoutingModule,
    IonicModule,
    FooterComponent
  ]
})
export class MorositaModule { }
