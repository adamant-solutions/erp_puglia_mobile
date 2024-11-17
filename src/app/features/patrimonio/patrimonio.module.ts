import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatrimonioRoutingModule} from './patrimonio-routing.module';
import {IonicModule} from '@ionic/angular';
import {PatrimonioPage} from './pages/patrimonio/patrimonio.page';
import {FooterComponent} from 'src/app/shared/footer/footer.component';


@NgModule({
  declarations: [PatrimonioPage],
  imports: [
    CommonModule,
    IonicModule,
    PatrimonioRoutingModule,
    FooterComponent
  ]
})
export class PatrimonioModule {
}
