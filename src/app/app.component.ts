import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Patrimonio', url: '/home/patrimonio' }, //Heritage
    { title: 'Contabilità', url: '/home/contabilità' }, //Accounting
    { title: 'Anagrafica', url: '/home/anagrafica' },  //Personal data
    { title: 'Contratti locazione', url: '/home/contratti-locazione' }, //Rental contracts
    { title: 'Manutenzione', url: '/home/manutenzione' }, //Maintenance
    { title: 'Ripartizione spese', url: '/home/ripartizione-spese' }, //Cost distribution
    { title: 'Morosità', url: '/home/morosità' },  //Default
    { title: 'Ciclo passivo', url: '/home/ciclo-pasivo' } // Passive cycle
  ];
  
  constructor() {}
}
