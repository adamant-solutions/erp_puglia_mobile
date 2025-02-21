import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import { RefreshService } from './core/services/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Anagrafica', url: 'anagrafica' },  //Personal data / Registry
    { title: 'Unità immobiliare', url: 'patrimonio' }, //Heritage/Assets
    { title: 'Contratti locazione', url: 'contratti-locazione' }, //Rental contracts
    { title: 'Manutenzione', url: 'manutenzione' }, //Maintenance
    { title: 'Ripartizione spese', url: 'ripartizione-spese' }, //Cost distribution
    { title: 'Morosità', url: 'morosità' },  //Default
    { title: 'Contabilità', url: 'contabilita' }, //Accounting
    { title: 'Ciclo passivo', url: 'ciclo-passivo' } // Passive cycle
  ];

  constructor(public menuController: MenuController,
              private router: Router,
              private refreshService: RefreshService) {
  }

  handleRefresh(event: any) {
    this.refreshService.refreshApp();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }



  goProfile() {
    this.router.navigate(['/profilo']);
    this.menuController.close()
  }
}
