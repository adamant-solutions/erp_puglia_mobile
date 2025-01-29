import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/core/services/alert.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { PatrimonioService } from 'src/app/core/services/patrimonio.service';
import { Comune, comuneList } from '../../../data/comune';
import { Provincia, provinciaList } from '../../../data/provincia';
import { StatoDisponibilita, TipoAmministrazione, TipoDocumento } from 'src/app/core/models/patrimonio.model';


@Component({
  selector: 'app-nuovo-patrimonio',
  templateUrl: './nuovo-patrimonio.page.html',
  styleUrls: ['./nuovo-patrimonio.page.scss'],
})
export class NuovoPatrimonioPage implements OnInit {

  pageTitle: string = "Nuovo patrimonio";
  constructor(
    private patrimonioSvc: PatrimonioService,
    private datePipe: DatePipe,
    private msgService: MessagesService,
    private router: Router,
    private alertService: AlertService,
    private alertController: AlertController) { }

  addForm!: FormGroup;
  submitted = false;
  errorMsg: string = '';
  comuni: Comune[] = comuneList;
  provincia: Provincia[] = provinciaList;
  tipoAmministrazione: TipoAmministrazione[] = ["DIRETTA", "INDIRETTA" , "MISTA"];
  statoDisponibilita: StatoDisponibilita[] = ["DISPONIBILE" , "OCCUPATO" , "IN_MANUTENZIONE" , "SFITTO" , "NON_DISPONIBILE"];
  tipoDocuments: TipoDocumento[] = ["CATASTALE", "CERTIFICAZIONE_ENERGETICA", "TAVOLA_PROGETTO" , "ATTO_PROVENIENZA" , "ALTRO"];
  documentiFiles: any[] =[];
  fileName: string[] = []

  ngOnInit() {
    this.initializeForm();
  }


  private initializeForm() {
    this.addForm = new FormGroup({
      metriQuadri: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      quartiere: new FormControl(null, Validators.required),
      tipoAmministrazione: new FormControl(null, Validators.required),
      statoDisponibilita: new FormControl(null, Validators.required),
      comune: new FormControl(null, Validators.required),
      provincia: new FormControl(null, [Validators.required, Validators.maxLength(2)]),
      indirizzo: new FormControl(null, Validators.required),
      sezioneUrbana: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      foglio: new FormControl(null, [Validators.required, Validators.maxLength(4)]),
      particella: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      categoriaCatastale: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      classeCatastale: new FormControl(null, [Validators.required, Validators.maxLength(2)]),
      renditaCatastale: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      consistenzaCatastale: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      zona: new FormControl(null),
      classeEnergetica: new FormControl(null),
      descrizione: new FormControl(null),
      civico: new FormControl(null),
      subalterno: new FormControl(null),
      piano: new FormControl(null),
      documenti: new FormArray([])
    });
  }

  get documenti() {
    return (this.addForm.get('documenti') as FormArray);
  }

  addDocument() {
    const documentGroup = new FormGroup({
      tipoDocumento: new FormControl(null, Validators.required),
      dataDocumento: new FormControl(null, Validators.required),
      percorsoFile: new FormControl(null, Validators.required),
      descrizione: new FormControl(null)
    });
    this.documenti.push(documentGroup);
  }

  removeDocument(index: number) {
    this.fileName = this.fileName.filter((_, i) => i !== index);
    this.documentiFiles = this.documentiFiles.filter((_, i) => i !== index);
    this.documenti.removeAt(index);
  }

  
  isDocumentTypeDisabled(currentIndex: number, documentType: string): boolean {
    return this.documenti.controls.some((doc, index) => 
      index !== currentIndex && 
      doc.get('tipoDocumento')?.value === documentType
    );
  }

  onDataDocumentoChange(event: any, index: number) {
    const selectedDate = new Date(event);
    const isoDate = selectedDate.toISOString()
    const documentiArray = this.addForm.get('documenti') as FormArray;

    documentiArray.at(index).get('dataDocumento')?.setValue(isoDate);
    /*    console.log(isoDate)  */
  }

  formatDisplayDate(index: number): string {
    const documentiArray = this.addForm.get('documenti') as FormArray;
    const dateValue = documentiArray.at(index).get('dataDocumento')?.value;

    if (!dateValue) return '';

    const date = new Date(dateValue);
    return this.formatDateToDDMMYYYY(date);
  }

  // Format date to DD-MM-YYYY
  formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  resetForm() {
    this.addForm.reset();
  }


  async cancelInputs() {
    const alert = await this.alertController.create({
      header: 'Annulla',
      message: 'Vuoi annullare l\'inserimento del nuovo patrimonio? I dati non salvati verranno persi.',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sì',
          role: 'confirm',
          handler: () => {
            this.resetForm();
            /*  this.router.navigate(['/patrimonio']); */
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
      //console.log("Filename:" ,this.fileName)
      this.documentiFiles[index] = file;
    }
  }

  
  onSubmit() {
    this.submitted = true;
    const patrimonioData = this.addForm.value;
     /* 
       console.log("Send: ", patrimonioData)
    console.log(this.addForm.value) */ 
    if (!this.addForm.valid) {
      // console.log('Form is invalid');
      return;
    }
    else {

      const sendData = {
        ...patrimonioData,
        documenti: patrimonioData.documenti.map((doc: { dataDocumento: string; }) => ({
          ...doc,
          dataDocumento: this.datePipe.transform(doc.dataDocumento, 'yyyy-MM-dd')
        }))
      };


      this.alertService.showConfirmation(
        'Conferma i dati personali',
        'Sei sicuro di voler aggiungere questo patrimonio? Questa azione non può essere annullata.'
      ).subscribe(confirmed => {
        if (confirmed) {
          this.patrimonioSvc.addPatrimonio(sendData, this.documentiFiles).then( (e) => {
            e.subscribe((res: any) => { console.log(res)
            if(res.status !== 200){
              console.log("ERROR: " ,res)
              this.msgService.error(res.data.message);
            }
            else{
              this.msgService.success("Dati salvati con successo!"); 
              console.log("SUCCESS :" ,res);
              setTimeout(()=>{
                this.router.navigate([`/patrimonio`])
              },2000)
            }
          }
          
          )
           })
          
        }
      });
    }
  }
}