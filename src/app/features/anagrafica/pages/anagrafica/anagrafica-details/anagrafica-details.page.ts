import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Anagrafica, TipoDocumento } from 'src/app/core/models/anagrafica.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-anagrafica-details',
  templateUrl: './anagrafica-details.page.html',
  styleUrls: ['./anagrafica-details.page.scss'],
})
export class AnagraficaDetailsPage implements OnInit {

  userData!: Anagrafica;

  breadCrumbs = [{ name: 'Anagrafica', url: '/anagrafica' }, { name: 'Anagrafica Dettagli', url: [] }]
  userForm!: FormGroup;
/*   tipoDocuments = Object(TipoDocumento); */
   tipoDocuments: TipoDocumento[] = ["Carta d'Identità", "Passaporto", "Patente"];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private anagraficaSrvc : AnagraficaService,
              private msgService: MessagesService,
              private alertService: AlertService,
              private platform: Platform) {
  }

  ngOnInit() {
    if(this.platform.is('hybrid')){
      this.route.data.subscribe({
        next: (data) => {
        /*   console.log("Details:" , data) */
          this.userData = data['anagraficaByIdResolver'].data
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    else {
      this.route.data.subscribe({
        next: (data) => {
          this.userData = data['anagraficaByIdResolver']
        },
        error: (err) => {
          console.log(err)
        }
      });
      /* console.log(this.userData); */
    }
  }

  
  async downloadDocument(selectedDocument: any) {
      try {
        const filePath = await firstValueFrom(
          this.anagraficaSrvc.downloadDocument(this.userData.id, selectedDocument.id)
        );
        this.msgService.success("File scaricato con successo!")
        console.log('File downloaded successfully:', filePath);
      } catch (error: any) {
        this.msgService.error(error.message)
        console.error('Error downloading file:', error );
      }
    }

  onDeleteClick() {
    this.alertService.showConfirmation(
      'Conferma Eliminazione', 
      'Sei sicuro di voler eliminare questa anagrafica? Questa azione non può essere annullata.'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.elimina();
      }
    });
  }

  elimina(){
    this.anagraficaSrvc.eliminaAnagrafica(this.userData.id).subscribe({
      next: (res) => {
        this.msgService.success("Eliminato con successo!")
        this.router.navigate(['/anagrafica']);
      },
      error: (err) => {
        this.msgService.error(err.message)
      }
    })
 
  }
}
