import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { from, map } from 'rxjs';
import { Contratti } from 'src/app/core/models/contratti.model';
import { ModelLight } from 'src/app/core/models/model-light.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { MessagesService } from 'src/app/core/services/messages.service';

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
  
  constructor(private contrattiService: ContrattiService,private alertController: AlertController, private msgService: MessagesService) { }
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

   async openAlert() {
    const alert = await this.alertController.create({
      header: 'Conferma Terminazione',
      message: `Sei sicuro di voler terminare questo contratto?
       Questa azione non può essere annullata.`,
      inputs: [
        {
          type: 'textarea',
          name: 'motivoFine',
          placeholder: 'Inserisci motivo ...',
        }
      ],
      cssClass : 'custom-alert',
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => false
        },
        {
          text: 'Conferma',
          cssClass: 'alert-button-confirm',
          handler: (data: any) => {
            this.termina(data.motivoFine);
          }
        }
      ],
      backdropDismiss: false,
    });
  
    await alert.present();
  
    return from(alert.onDidDismiss()).pipe(
      map((result: any) => result.role !== 'cancel')
    );
  }
    termina(motivoFine: string) {
      if (motivoFine) {
        this.contrattiService.terminaContratto(this.contrattiData.id, motivoFine).subscribe({
          next: () => {
            this.msgService.success("Il contratto è stato terminato con successo!")
            this.router.navigate(['/contratti-locazione']);
          },
          error: (error: any) => {  
            this.msgService.error(error.error.message,5000)
            console.error('Errore nella terminazione del contratto:', error);
          }
        });
      }
    }
}


