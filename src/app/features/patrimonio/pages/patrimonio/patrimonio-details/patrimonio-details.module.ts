import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatrimonioDetailsPageRoutingModule } from './patrimonio-details-routing.module';

import { PatrimonioDetailsPage } from './patrimonio-details.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatrimonioDetailsPageRoutingModule,
    FooterComponent
  ],
  declarations: [PatrimonioDetailsPage]
})
export class PatrimonioDetailsPageModule {}
