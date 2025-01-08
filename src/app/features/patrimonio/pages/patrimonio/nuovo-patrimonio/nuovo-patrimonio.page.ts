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

  ngOnInit() {
    this.initializeForm();
  }


  private initializeForm() {
    this.addForm = new FormGroup({
      metriQuadri: new FormControl(null, [Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      quartiere: new FormControl(null, Validators.required),
      tipoAmministrazione: new FormControl('DIRETTA', Validators.required),
      statoDisponibilita: new FormControl('DISPONIBILE', Validators.required),
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
    // if (this.addForm.valid) {
    console.log(this.addForm.value);

    /* } else {
      console.log('Form is invalid');
    } */
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