import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrattiDetailsPageRoutingModule } from './contratti-details-routing.module';

import { ContrattiDetailsPage } from './contratti-details.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrattiDetailsPageRoutingModule,
    FooterComponent,
    CapitalizePipe
  ],
  declarations: [ContrattiDetailsPage]
})
export class ContrattiDetailsPageModule {}
