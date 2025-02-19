import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { httpsInterceptor } from './core/interceptors/https.interceptor';
import { AuthorizationService } from './core/services/authorization.service';
import { environment } from 'src/environments/environment';
import { PatrimonioService } from './core/services/patrimonio.service';
import { AnagraficaService } from './core/services/anagrafica.service';
import { ContrattiService } from './core/services/contratti.service';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({  
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatePipe,
    provideHttpClient(withInterceptors([httpsInterceptor,loaderInterceptor])),
    AuthorizationService,
    PatrimonioService,
    AnagraficaService,
    ContrattiService,
    { provide: 'accessTokenUrl', useValue: environment.accessTokenUrl },
    { provide: 'patrimonioUrl', useValue: environment.patrimonioUrl },
    { provide: 'anagraficaUrl', useValue: environment.anagraficaUrl },
    { provide: 'contrattiUrl', useValue: environment.contrattiUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
