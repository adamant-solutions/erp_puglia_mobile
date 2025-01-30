import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Contratti } from 'src/app/core/models/contratti.model';
import { ModelLight } from 'src/app/core/models/model-light.model';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-contratti-details',
  templateUrl: './contratti-details.page.html',
  styleUrls: ['./contratti-details.page.scss'],
})
export class ContrattiDetailsPage implements OnInit {

  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute)
  private platform = inject(Platform);
  contrattiData!: Contratti;
  patrimonio: ModelLight[] = [];
  
  constructor(private alertService: AlertService) { }
  ngOnInit() {
    if (this.platform.is('hybrid')) {
      this.getContrattiInHybrid()
    }
    else {
      this.getContratti()
    }
  }

  getContratti() {
    this.activeRoute.data.subscribe({
      next: (data) => {
        this.contrattiData = data['contrattiByIdResolver']
        this.patrimonio = data['unitaImmobiliareResolver'].body;
        /*  console.log(this.contrattiData) */
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getContrattiInHybrid() {
    this.activeRoute.data.subscribe({
      next: (data) => {
        
         console.log("Details:" , data) 
        this.contrattiData = data['contrattiByIdResolver'].data;
        this.patrimonio = data['unitaImmobiliareResolver'].data;
        
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  
  getUnitaImmobiliareDescrizione(unitaImmobiliareId: any): string {
    const found = this.patrimonio.find(item => item.id === unitaImmobiliareId);
    return found ? found.descrizione : '';
  }
  
  trackByDoc(index: number, doc: any): any {
    return doc.id;
  }

  openAlert() {
    this.alertService.showConfirmation(
      'Conferma Terminazione', 
      'Sei sicuro di voler terminare questo contratto? Questa azione non può essere annullata.',
      [
      {
        type: 'textarea',
        placeholder: 'Inserisci motivo ...',
      }
    ]
    ).subscribe(confirmed => {
      if (confirmed) {
        this.termina();
      }
    });
  }

  termina(){

  }
}
