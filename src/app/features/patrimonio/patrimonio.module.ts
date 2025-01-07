import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatrimonioRoutingModule} from './patrimonio-routing.module';
import {IonicModule} from '@ionic/angular';
import {PatrimonioPage} from './pages/patrimonio/patrimonio.page';
import {FooterComponent} from 'src/app/shared/footer/footer.component';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [PatrimonioPage],
  imports: [
    CommonModule,
    IonicModule,
    PatrimonioRoutingModule,
    FooterComponent
  ],
  providers: [
      PatrimonioService,
    { provide: 'patrimonioUrl', useValue: environment.patrimonioUrl },
  ]
})
export class PatrimonioModule {
}
