import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {title: 'Patrimonio', url: 'patrimonio'}, //Heritage/Assets
    {title: 'Contabilità', url: 'contabilita'}, //Accounting
    {title: 'Anagrafica', url: 'anagrafica'},  //Personal data / Registry
    {title: 'Contratti locazione', url: 'contratti-locazione'}, //Rental contracts
    {title: 'Manutenzione', url: 'manutenzione'}, //Maintenance
    {title: 'Ripartizione spese', url: 'ripartizione-spese'}, //Cost distribution
    {title: 'Morosità', url: 'morosità'},  //Default
    {title: 'Ciclo passivo', url: 'ciclo-pasivo'} // Passive cycle
  ];

  constructor(public menuController: MenuController, private router: Router) {
  }

  goProfile() {
    this.router.navigate(['/profilo']);
    this.menuController.close()
  }
}
