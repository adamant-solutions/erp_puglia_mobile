import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private activeRoute: ActivatedRoute,
              private msgService: MessagesService,
              private alertService: AlertService,
              private patrimonioSrvc : PatrimonioService,
  ) {
  }

  ngOnInit() {
  
    this.activeRoute.data.subscribe({
      next: (data) => {
        this.patrimonioData = data['patrimonioByIdResolver']
       /*  console.log(this.patrimonioData) */
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


  trackByDoc(index: number, doc: any): any {
    return doc.id;
  }

  onDeleteClick() {
    this.alertService.showConfirmation(
      'Conferma Eliminazione', 
      'Sei sicuro di voler eliminare questo patrimonio? Questa azione non può essere annullata.'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.elimina();
      }
    });
  }

  elimina(){
    this.patrimonioSrvc.eliminaPatrimonio(this.patrimonioData.id).subscribe({
      next: (res) => {
        this.msgService.success("Eliminato con successo!")
        this.router.navigate(['/patrimonio']);
      },
      error: (err) => {
        this.msgService.error(err.message)
      }
    })
  }

}
