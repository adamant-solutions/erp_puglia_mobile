import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import { firstValueFrom, Subscription } from 'rxjs';
import {Patrimonio} from 'src/app/core/models/patrimonio.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';

@Component({
  selector: 'app-patrimonio-details',
  templateUrl: './patrimonio-details.page.html',
  styleUrls: ['./patrimonio-details.page.scss'],
})
export class PatrimonioDetailsPage implements OnInit {

  breadCrumbs = [{name: 'Patrimonio', url: '/'}, {name: 'Patrimonio Dettagli', url: []}]
  patrimonioData!: Patrimonio;
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute)
  private platform = inject(Platform);
  private subscriptions: Subscription[] = [];

  constructor(private msgService: MessagesService,
              private alertService: AlertService,
              private patrimonioSrvc : PatrimonioService,
  ) {
  }

  ngOnInit() {
    if (this.platform.is('hybrid')) {
      this.getPatrimonioInHybrid()
    }
    else {
      this.getPatrimonio()
    }
  }

  getPatrimonio() {
   const dataSub = this.activeRoute.data.subscribe({
      next: (data) => {
        this.patrimonioData = data['patrimonioByIdResolver']
        /*  console.log(this.patrimonioData) */
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.subscriptions.push(dataSub);
  }

  getPatrimonioInHybrid() {
    const dataSub =  this.activeRoute.data.subscribe({
      next: (data) => {
        
         console.log("Details:" , data) 
        this.patrimonioData = data['patrimonioByIdResolver'].data
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.subscriptions.push(dataSub);
  }

  trackByDoc(index: number, doc: any): any {
    return doc.id;
  }

  onDeleteClick(unita : Patrimonio) {
    
    const patrimonioIndirizzo = unita.indirizzo;
    const patrimonioCivico = unita.civico;
    const patrimonioComune = unita.comune;
/*  ${patrimonioIndirizzo} - ${patrimonioCivico} - ${patrimonioComune} */
    this.alertService.showConfirmation(
      'Conferma Eliminazione', 
      `Sei sicuro di voler eliminare questa unità immobiliare?
       Questa azione non può essere annullata!`
    ).subscribe(confirmed => {
      if (confirmed) {
        this.elimina();
      }
    });
  }

  elimina(){
    this.patrimonioSrvc.eliminaPatrimonio(this.patrimonioData.id).subscribe({
      next: (res) => {
        this.msgService.success("Unità Immobiliare eliminata con successo!")
        this.router.navigate(['/patrimonio']);
      },
      error: (err) => {
        this.msgService.error(err.error.message)
      }
    })
  }

   
  async downloadDocument(selectedDocument: any) {
    try {
      const filePath = await firstValueFrom(
        this.patrimonioSrvc.downloadDocument(this.patrimonioData.id, selectedDocument.id)
      );
      this.msgService.success("Il file è stato scaricato con successo!")
      console.log('File downloaded successfully:', filePath);
    } catch (error : any) {
      this.msgService.error("Download del file non riuscito!",5000)
      console.error('Error downloading file:', error );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
 
}
