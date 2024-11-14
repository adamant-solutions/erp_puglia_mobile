import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';

@Component({
  selector: 'app-patrimonio-details',
  templateUrl: './patrimonio-details.page.html',
  styleUrls: ['./patrimonio-details.page.scss'],
})
export class PatrimonioDetailsPage implements OnInit {

  breadCrumbs = [{ name: 'Patrimonio', url: '/' }, { name: 'Patrimonio Dettagli', url: [] }]
  modelMock: Patrimonio = 
    {
      id: 1,
      edilizia: {
        metri_quadri: 120,
        quartiere: 'Centro Storico', 
        zona: 'Centro',
        classe_energetica: 'A+', 
        year_of_construction: 1995, 
        province: 'Puglia'
      },
      riferimentoDetails: {
        tipologia_di_amministrazione: 'Privata',
        stato_di_disponibilita: 'Disponibile',
        tipoSfittanza: 'Affitto',
        tipologia_di_contratto: 'Contratto a lungo termine',
        tipo_di_registrazione: 'Registrato', 
        causale_di_cessazione: 'Cessazione per scadenza contratto'
      }
    }
  

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
