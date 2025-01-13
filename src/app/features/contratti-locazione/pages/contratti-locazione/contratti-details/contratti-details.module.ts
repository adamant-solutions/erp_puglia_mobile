import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrattiDetailsPageRoutingModule } from './contratti-details-routing.module';

import { ContrattiDetailsPage } from './contratti-details.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrattiDetailsPageRoutingModule,
    FooterComponent
  ],
  declarations: [ContrattiDetailsPage]
})
export class ContrattiDetailsPageModule {}
