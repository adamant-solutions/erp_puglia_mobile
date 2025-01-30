import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrattiEditPageRoutingModule } from './contratti-edit-routing.module';

import { ContrattiEditPage } from './contratti-edit.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrattiEditPageRoutingModule,
    FooterComponent
  ],
  declarations: [ContrattiEditPage]
})
export class ContrattiEditPageModule {}
