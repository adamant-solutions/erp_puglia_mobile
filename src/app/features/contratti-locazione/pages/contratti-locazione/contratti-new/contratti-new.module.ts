import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrattiNewPageRoutingModule } from './contratti-new-routing.module';

import { ContrattiNewPage } from './contratti-new.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContrattiNewPageRoutingModule,
    FooterComponent,
    CapitalizePipe
  ],
  declarations: [ContrattiNewPage]
})
export class ContrattiNewPageModule {}
