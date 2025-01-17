import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Patrimonio, StatoDisponibilita, TipoAmministrazione, TipoDocumento } from 'src/app/core/models/patrimonio.model';
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
    tipoAmministrazione: 'DIRETTA',
    statoDisponibilita: 'DISPONIBILE',
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
  tipoDocuments: TipoDocumento[] = ["CATASTALE", "CERTIFICAZIONE_ENERGETICA", "TAVOLA_PROGETTO" , "ATTO_PROVENIENZA" , "ALTRO"];
  tipoAmministraziones: TipoAmministrazione[] = ["DIRETTA", "INDIRETTA" , "MISTA"];
  statoDisponibilitas: StatoDisponibilita[] = ["DISPONIBILE" , "OCCUPATO" , "IN_MANUTENZIONE" , "SFITTO" , "NON_DISPONIBILE"];
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platform = inject(Platform);
  @ViewChild('patrimonioForm') patrimonioForm!: NgForm;
  documentiFiles: any[] =[];
  fileName: string[] = []
  
  
  constructor(private alertController: AlertController,
    private datePipe: DatePipe,
    private patrimonioSrv: PatrimonioService,
    private msgService: MessagesService) { }

  ngOnInit() {
    
      this.route.data.subscribe({
        next: (data) => {
          if(this.platform.is('hybrid')){
            this.patrimonioData = data['patrimonioByIdResolver'].data;
            this.patrimonioData.createDate = this.datePipe.transform(this.patrimonioData.createDate, 'dd/MM/yyyy')!;
            this.patrimonioData.lastUpdateDate = this.datePipe.transform(this.patrimonioData.lastUpdateDate, 'dd/MM/yyyy')!;
         //   this.patrimonioData.documenti = this.patrimonioData.documenti || [];
          }
          else{
          this.patrimonioData = data['patrimonioByIdResolver'];
          this.patrimonioData.createDate = this.datePipe.transform(this.patrimonioData.createDate, 'dd/MM/yyyy')!;
          this.patrimonioData.lastUpdateDate = this.datePipe.transform(this.patrimonioData.lastUpdateDate, 'dd/MM/yyyy')!;
          
      //    this.patrimonioData.documenti = this.patrimonioData.documenti || [];
          }
          this.formData = JSON.parse(JSON.stringify(this.patrimonioData)); 
        /*   console.log(this.formData) */
          
        },
        error: (err) => {
          console.log(err)
        }
      });

  }

  addDocumento(){
    this.patrimonioData.documenti.push({
      tipoDocumento: 'CATASTALE',
      dataDocumento: '',
      percorsoFile: '',
      descrizione: ''
    });
  }

  removeDocumento(index: number){
    this.fileName = this.fileName.filter((_, i) => i !== index);
    this.documentiFiles = this.documentiFiles.filter((_, i) => i !== index);
    this.patrimonioData.documenti.splice(index, 1);
   // this.documenti.splice(index, 1);
  }

  
/*   isDocumentTypeDisabled(currentIndex: number, documentType: string): boolean {
    return this.patrimonioData.documenti.some((doc:any,index:any) => 
      index !== currentIndex && 
      doc.tipoDocumento === documentType
    );
  }
  */


    onDataDocumentoChange(selectedDate: any, index: number) {
      //console.log(selectedDate)
      if (!selectedDate) return;
      this.patrimonioData.documenti[index].dataDocumento = this.datePipe.transform(selectedDate,'yyyy-MM-dd')!;
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
          this.patrimonioData = JSON.parse(JSON.stringify(this.formData));
            
          }
        }
      ],
      cssClass: 'custom-annulla-alert'
    });
  
    await alert.present();
  }


  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.fileName[index] = file.name
     this.patrimonioData.documenti[index].percorsoFile = file.name;

    } 
      this.documentiFiles[index] = file;

  }

  
  onSubmit() {  

    /* console.log(this.patrimonioForm.value) */
    if (this.patrimonioForm.valid) {

     const sendData = { 
      ...this.patrimonioData,
      createDate:  this.formatDate(this.patrimonioData.createDate)!,/* this.getISODate(this.patrimonioData.createDate),*/
      lastUpdateDate: this.formatDate(this.patrimonioData.lastUpdateDate)!
    };
      //console.log("SEND ",sendData)

       if(this.platform.is('hybrid')){
      
        this.patrimonioSrv.editPatrimonio(sendData,this.documentiFiles)?.subscribe({
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
       this.patrimonioSrv.editPatrimonio(sendData,this.documentiFiles).subscribe({
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
    else if (err.status === 409) {
      this.errorMsg = "Error! " + err.error.message;
    }
    else {
      this.errorMsg = "Error! " + err.message;
    }
    this.msgService.error(this.errorMsg);

  }

  formatDate(dateStr: string){
  
    const [day, month, year] = dateStr.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    dateStr = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }
 
}
