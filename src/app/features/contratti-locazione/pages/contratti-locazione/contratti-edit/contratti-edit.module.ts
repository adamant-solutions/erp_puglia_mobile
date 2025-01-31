import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrattiEditPageRoutingModule } from './contratti-edit-routing.module';

import { ContrattiEditPage } from './contratti-edit.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContrattiEditPageRoutingModule,
    FooterComponent,
    CapitalizePipe
  ],
  declarations: [ContrattiEditPage]
})
export class ContrattiEditPageModule {}
