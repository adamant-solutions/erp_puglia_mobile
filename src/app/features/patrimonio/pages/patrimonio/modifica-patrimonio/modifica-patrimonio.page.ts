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
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-modifica-patrimonio',
  templateUrl: './modifica-patrimonio.page.html',
  styleUrls: ['./modifica-patrimonio.page.scss'],
})
export class ModificaPatrimonioPage implements OnInit {

  pageTitle: string = "Modifica Unità Immobiliare"
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

  async onFileSelected(event: any, index: number) {
    if (this.platform.is('hybrid')) {
      try {
        const result = await this.pickFiles();
        if (result && result.length > 0) {
          const file = result[0]; // Get first file since picker can return multiple
          this.fileName[index] = file.name;
          if (this.patrimonioData.documenti[index]) {
            this.patrimonioData.documenti[index].percorsoFile = file.name;
          }
          this.documentiFiles[index] = file;
         // console.log("in ts: " ,file ,this.fileName,this.patrimonioData.documenti)
        }
      } catch (error) {
        console.error('Error picking file:', error);
        this.msgService.error("Errore durante la selezione del file");
      }
    } else {
      const file = event.target.files[0];
      if (file) {
        this.fileName[index] = file.name;
        if (this.patrimonioData.documenti[index]) {
          this.patrimonioData.documenti[index].percorsoFile = file.name;
        }
        // Convert file to format as mobile files
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result as string;
          this.documentiFiles[index] = {
            name: file.name,
            data: base64Data.split(',')[1], // Remove data:application/pdf;base64,
            type: file.type || 'application/pdf'
          };
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  async pickFiles() {
    try {
      const result = await FilePicker.pickFiles({
        readData: true,
        types: ['application/pdf'],
      });
      
      if (result && result.files && result.files.length > 0) {
        return result.files.map(file => ({
          name: file.name,
          data: file.data, // base64 data
          type: file.mimeType || 'application/pdf',
        }));
      }
      return [];
    } catch (error) {
      console.error('Error picking files:', error);
      throw error;
    }
  }
 

  onSubmit() {  
    
    /* console.log(this.patrimonioForm.value) */
    if (this.patrimonioForm.valid) {
    
     const sendData = { 
      ...this.patrimonioData,
      createDate:  this.formatDate(this.patrimonioData.createDate)!,// this.getISODate(this.patrimonioData.createDate),
      lastUpdateDate: this.formatDate(this.patrimonioData.lastUpdateDate)!
    };
      console.log("SEND ",sendData)

       if(this.platform.is('hybrid')){
      
       this.patrimonioSrv.editPatrimonio(sendData, this.documentiFiles).then( (e) => {
        e.subscribe((res: any) => { console.log(res)
        if(res.status !== 200){
          console.log("ERROR: " ,res)
          this.msgService.error(res.data.message);
        }
        else{
          this.msgService.success("Dati salvati con successo!"); 
          console.log("SUCCESS :" ,res);
          setTimeout(()=>{
            this.router.navigate([`/patrimonio/${this.patrimonioData.id}/patrimonio-details`])
          },2000)
        }
      }
      
      )
       }
      );
      }
    } else {
      return;
    }
  }

  private handleError(err: any) {
    if (err.status === 400) {
      this.errorMsg = err.error.message;
    } else if(err.status === 415){
      this.errorMsg = "Tipo di media non supportato. Controlla il formato del file o della richiesta.";
    }
    else {
      this.errorMsg = "Error! " + err.error.message;
    }
    this.msgService.error(this.errorMsg,5000);

  }

  formatDate(dateStr: string){
  
    const [day, month, year] = dateStr.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS')!;
  }
 
}
