import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Patrimonio, TipoDocumento } from 'src/app/core/models/patrimonio.model';
import { Comune, comuneList } from '../../../data/comune';
import { Provincia, provinciaList } from '../../../data/provincia';
import { DatePipe } from '@angular/common';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-modifica-patrimonio',
  templateUrl: './modifica-patrimonio.page.html',
  styleUrls: ['./modifica-patrimonio.page.scss'],
})
export class ModificaPatrimonioPage implements OnInit {

  pageTitle: string = "Modifica Patrimonio"
  patrimonioData!: Patrimonio;
  submitted: boolean = false;
  errorMsg = '';
  formData: Patrimonio = {
    id: 0,
    createDate: '',
    lastUpdateDate: '',
    metriQuadri: 0,
    quartiere: '',
    zona: '',
    classeEnergetica: '',
    tipoAmministrazione: '',
    statoDisponibilita: '',
    descrizione: '',
    comune: '',
    provincia: '',
    indirizzo: '',
    civico: '',
    sezioneUrbana: '',
    foglio: '',
    particella: '',
    subalterno: '',
    categoriaCatastale: '',
    classeCatastale: '',
    renditaCatastale: 0,
    consistenzaCatastale: 0,
    piano: '',
    documenti: []
  };
  comuni: Comune[] = comuneList;
  provincia: Provincia[] = provinciaList;
  tipoDocuments = Object.values(TipoDocumento);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  @ViewChild('patrimonioForm') patrimonioForm!: NgForm;
  
  
  constructor(private alertController: AlertController,
    private datePipe: DatePipe,
    private platform: Platform,
    private patrimonioSrv: PatrimonioService,
    private msgService: MessagesService) { }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.patrimonioData = data['patrimonioByIdResolver'];
        this.patrimonioData.createDate = this.datePipe.transform(this.patrimonioData.createDate, 'dd/MM/yyyy')!;
        this.patrimonioData.lastUpdateDate = this.datePipe.transform(this.patrimonioData.lastUpdateDate, 'dd/MM/yyyy')!;
        this.patrimonioData.documenti = this.patrimonioData.documenti || [];
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  addDocumento(){
    this.patrimonioData.documenti.push({
      tipoDocumento: TipoDocumento.CATASTALE,
      dataDocumento: '',
      percorsoFile: '',
      descrizione: ''
    });
  }

  removeDocumento(index: number){
    this.patrimonioData.documenti.splice(index, 1);
   // this.documenti.splice(index, 1);
  }

  
  isDocumentTypeDisabled(currentIndex: number, documentType: string): boolean {
    return this.patrimonioData.documenti.some((doc:any,index:any) => 
      index !== currentIndex && 
      doc.tipo_documento === documentType
      
    );
  }
  

  onDataDocumentoChange(selectedDate: any, index: number) {
    //console.log(selectedDate)
    if (!selectedDate) return;
    this.patrimonioData.documenti[index].dataDocumento = selectedDate;
  }
 
  async cancelModifiedInputs() {
    const alert = await this.alertController.create({
      header: 'Annulla Modifiche',
      message: 'Vuoi annullare le modifiche per questa sezione?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Sì',
          role: 'confirm',
          handler: () => {
            //this.patrimonioForm.reset();
           // console.log(this.patrimonioData)
           //this.patrimonioForm.resetForm(this.patrimonioData);
            
          }
        }
      ],
      cssClass: 'custom-annulla-alert'
    });
  
    await alert.present();
  }

  onSubmit() {  

    if (this.patrimonioForm.valid) {

     const sendData = { 
      ...this.patrimonioData,
      createDate:  this.datePipe.transform(this.patrimonioData.createDate,'yyyy-MM-ddTHH:mm:ss.SSS')!,/* this.getISODate(this.patrimonioData.createDate),*/
      lastUpdateDate:this.datePipe.transform(this.patrimonioData.lastUpdateDate,'yyyy-MM-ddTHH:mm:ss.SSS')!
    };
      //console.log("SEND ",sendData)

       if(this.platform.is('hybrid')){
      
        this.patrimonioSrv.editPatrimonio(sendData)?.subscribe({
          next: (res: any) => {
            if (res.error) {
              this.handleError(res);
             /*  console.log("is error: " ,res); */
            } else {
              this.msgService.success("Dati salvati con successo!");
              console.log(res);
            }
          },
        complete: ()=> {
          this.router.navigate([`/patrimonio/${this.patrimonioData.id}/patrimonio-details`])
        }
        }) 
      }
      else {       
       this.patrimonioSrv.editPatrimonio(sendData).subscribe({
          next: (res) => {
            this.msgService.success("Dati salvati con successo!"); 
            console.log(res);
          },
          error: (err) => {
            this.handleError(err);
          },
        complete: ()=> {
          this.router.navigate([`/patrimonio/${this.patrimonioData.id}/patrimonio-details`])
        }
        });
      }
    } else {
      return;
    }
  }

  private handleError(err: any) {
    if (err.status === 500) {
      this.errorMsg = "Errore interno del server!";
    } else if (err.status === 400) {
      this.errorMsg = "Si è verificato un errore durante l'invio dei dati. Controllare nuovamente i dati inseriti.";//Compila tutti i campi obbligatori
    }
    else {
      this.errorMsg = "Error! " + err.message;
    }
    this.msgService.error(this.errorMsg);

  }
 
}
