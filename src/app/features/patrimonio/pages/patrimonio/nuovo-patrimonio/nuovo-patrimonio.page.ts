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
  tipoDocuments: TipoDocumento[] = ["CATASTALE", "CERTIFICAZIONE_ENERGETICA", "TAVOLA_PROGETO" , "ATTO_PROVENIENZA" , "ALTRO"];

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

  onSubmit() {
    this.submitted = true;
    const patrimonioData = this.addForm.value;
    /*
       console.log("Send: ", sendData)
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
          this.patrimonioSvc.addPatrimonio(sendData).subscribe({
            next: (response) => {
              /*   console.log("Response: ", response) */
              this.msgService.success('Dati salvati con successo!');
            },
            error: (err) => {
              if (err.status === 500) {
                this.errorMsg = "Errore interno del server!"
              }
              else if (err.status === 400) {
                this.errorMsg = 'Compila tutti i campi obbligatori';
              }
              else if (err.status === 422) {
                this.errorMsg = 'Campi di input non validi o contenuto esistente inviato! Controlla nuovamente i tuoi dati!';
              }
              else {
                this.errorMsg = "Error!" + err.message;
              }
              this.msgService.error(this.errorMsg);
            },
            complete: () => {
              this.router.navigate(['/patrimonio'])
            }
          })
        }
      });
    }
  }
}
/*

  {
  "metriQuadri": 120.5,  // Float, should match model
  "quartiere": "Murat",  // String, required
  "tipoAmministrazione": "DIRETTA",  // String, Enum, required
  "statoDisponibilita": "DISPONIBILE",  // String, Enum, required
  "comune": "Bari",  // String, required
  "provincia": "BA",  // String (2 char), required
  "indirizzo": "Via Sparano",  // String, required
  "sezioneUrbana": "A",  // String (max 3 char), required
  "foglio": "125",  // String (max 4 char), required
  "particella": "1234",  // String (max 5 char), required
  "categoriaCatastale": "A2",  // String (max 3 char), required
  "classeCatastale": "3",  // String (max 2 char), required
  "renditaCatastale": 750.50,  // Float, required
  "consistenzaCatastale": 120.5,  // Float, required
  "zona": "Centro",  // Optional string
  "classeEnergetica": "A+",  // Optional string
  "descrizione": "Appartamento luminoso al terzo piano con vista mare",  // Optional string
  "civico": "45",  // String, optional
  "subalterno": "12",  // String, optional
  "piano": "3",  // String, optional
  "documenti": [  // Array of documents
    {
      "tipoDocumento": "CATASTALE",  // String, required
      "dataDocumento": "2024-03-20",  // Date string, required
      "percorsoFile": "/documenti/catasto/doc123.pdf",  // String, required
      "descrizione": "Planimetria catastale"  // Optional string
    }
  ]
}
   */