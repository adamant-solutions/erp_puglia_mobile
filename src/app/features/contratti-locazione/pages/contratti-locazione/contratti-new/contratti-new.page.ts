import { DatePipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, ModalController, Platform } from '@ionic/angular';
import { StatoContratto } from 'src/app/core/models/contratti.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { ModelLight } from 'src/app/core/models/model-light.model';

@Component({
  selector: 'app-contratti-new',
  templateUrl: './contratti-new.page.html',
  styleUrls: ['./contratti-new.page.scss'],
})
export class ContrattiNewPage implements OnInit {

  pageTitle: string = "Nuovo contratto";
  addForm!: FormGroup;
  submitted = false;
  errorMsg: string = '';
  statoContratti: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  patrimonioList: ModelLight[] = [];
  filteredPatrimonioList: any[] = [];
  anagraficaList: ModelLight[] = [];
  filteredIntestatariList: ModelLight[] = [];
  intestatariList: ModelLight[] = [];
  documentiFiles: any[] =[];
  fileName: string[] = [];
  searchText: string = '';
  @ViewChild('modal') modal!: IonModal;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedItem: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef; // Reference to the hidden input

  constructor(
    private contrattiSvc: ContrattiService,
    private datePipe: DatePipe,
    private msgService: MessagesService,
    private alertService: AlertService,
    private alertController: AlertController,
    private platform: Platform,
    private modalController: ModalController) { }

  ngOnInit() {
    this.initForm();
    this.getList()
    this.filteredPatrimonioList = [...this.patrimonioList];
    this.filteredIntestatariList = [...this.intestatariList]
  }



  getList() {
    this.route.data.subscribe({
      next: (data) => {
        const patrimonioData = data['unitaImmobiliareResolver']
        const intestatariData = data['intestatariResolver']
        if (this.platform.is('hybrid')) {
          this.patrimonioList = patrimonioData.data
          this.intestatariList = intestatariData.data
        }
        else{
          this.patrimonioList = patrimonioData.body
          this.intestatariList = intestatariData.body
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  private initForm() {
    this.addForm = new FormGroup({
      dataInizio: new FormControl(null, Validators.required),
      dataFine: new FormControl(null),
      canoneMensile: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      statoContratto: new FormControl(null, Validators.required),
      descrizione: new FormControl(null),
      unitaImmobiliare: new FormControl(null, Validators.required),
      intestatari: new FormArray([]),
      documenti: new FormArray([]),
    })

  }

  get intestatari(): FormArray {
    return this.addForm.get('intestatari') as FormArray;
  }

  addIntestatario(): void {
    const intestatarioGroup = new FormGroup({
      intestatario: new FormGroup({
        id: new FormControl(null, Validators.required),
      }),
      dataInizio: new FormControl(null, Validators.required)
    });

    this.intestatari.push(intestatarioGroup);
     console.log(this.intestatari.controls)
  }

  removeIntestatario(index: number): void {
    this.intestatari.removeAt(index);
  }

  get documenti() {
    return (this.addForm.get('documenti') as FormArray);
  }
  
triggerFileInput() {
  this.fileInput.nativeElement.click();
}

addDocument(event: any) {
  const file = event.target.files[0]; 
  if (file) {
    const documentGroup = new FormGroup({
      nomeFile: new FormControl(file.name, Validators.required)
    });

    this.documenti.push(documentGroup);
    this.documentiFiles.push(file);
  }
}

  removeDocument(index: number) {
    this.documentiFiles.splice(index, 1);
    this.documenti.removeAt(index);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  filterItemsPatrimonio(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filteredPatrimonioList = [...this.patrimonioList];
      return;
    }

    this.filteredPatrimonioList = this.patrimonioList.filter(item =>
      item.descrizione.toLowerCase().includes(searchTerm)
    );
  }

  filterItemsAnagrafica(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filteredIntestatariList = [...this.intestatariList];
      return;
    }

    this.filteredIntestatariList = this.intestatariList.filter(item =>
      item.descrizione.toLowerCase().includes(searchTerm)
    );
  }

  selectItem(item: any) {
    this.addForm.get('unitaImmobiliare')?.setValue(item);
    this.modal.dismiss();
  }

  isSelected(item: any): boolean {
    const currentValue = this.addForm.get('unitaImmobiliare')?.value;
    return currentValue && currentValue.id === item.id;
  }

  getDisplayValue(): string {
    const value = this.addForm.get('unitaImmobiliare')?.value;
    return value ? `${value.descrizione}` : '';
  }

    getIntestatariValue(index: number) {
    const intArray = this.addForm.get('intestatari') as FormArray;
    //console.log(intArray.at(index)?.get('intestatario')?.get('id'))
    const value = intArray.at(index)?.get('intestatario')?.get('id')?.value;
    return value ? `${value.descrizione}` : '';
  }

  selectItemIntestatari(item: ModelLight, index: number) {
    const intArray = this.addForm.get('intestatari') as FormArray;
    intArray.at(index)?.get('intestatario')?.get('id')?.setValue(item); 
    this.modalController.dismiss();
  }

  onDataInizioChange(event: any) {
    const selectedDate = new Date(event);
    const isoDate = selectedDate.toISOString()
    this.addForm.get('dataInizio')?.setValue(isoDate);
  }

  onDataInizioIntestatariChange(event: any, index: number) {
    const selectedDate = new Date(event);
    const isoDate = selectedDate.toISOString()
    const intestatariArray = this.addForm.get('intestatari') as FormArray
    intestatariArray.at(index).get('dataInizio')?.setValue(isoDate);
  }

  onDataFineChange(event: any) {
    const selectedDate = new Date(event);
    const isoDate = selectedDate.toISOString()
    this.addForm.get('dataFine')?.setValue(isoDate);
  }

  formatDisplayInizioDate() {
    const dateValue = this.addForm?.get('dataInizio')?.value;

    if (!dateValue) return '';

    const date = new Date(dateValue);
    return this.formatDateToDDMMYYYY(date);

  }

  formatDisplayFineDate() {
    const dateValue = this.addForm?.get('dataFine')?.value;

    if (!dateValue) return '';

    const date = new Date(dateValue);
    return this.formatDateToDDMMYYYY(date);
  }

  formatDisplayInizioIntestatariDate(index: number): string {
    const intestatariArray = this.addForm.get('intestatari') as FormArray;
    const dateValue = intestatariArray.at(index).get('dataInizio')?.value;

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

  onSubmit() {
    this.submitted = true;
    const sendContratto = this.addForm.getRawValue();

    const unitaImmobiliareID = this.addForm.get('unitaImmobiliare')?.getRawValue()?.id
    
    const sendIntestatari = sendContratto.intestatari?.map((intestatario: any) => ({
      intestatario: {
        id: intestatario.intestatario.id.id 
      },
      dataInizio: this.datePipe.transform(intestatario.dataInizio, 'yyyy-MM-dd')
    })) || [];
  
    const sendData = {
      ...sendContratto,
      dataInizio: this.datePipe.transform(sendContratto.dataInizio, 'yyyy-MM-dd'),
      dataFine: this.datePipe.transform(sendContratto.dataFine!, 'yyyy-MM-dd'),
      unitaImmobiliare: { id: unitaImmobiliareID },
      intestatari: sendIntestatari,
      documenti: this.documentiFiles
    };

/*     console.log(sendData) */
    if (this.addForm.valid) {

 
      this.alertService.showConfirmation(
        'Conferma azione',
        'Sei sicuro di voler aggiungere questo contratto? Questa azione non può essere annullata.'
      ).subscribe(confirmed => {
        if (confirmed) {
          this.contrattiSvc.addContratti(sendData,this.documentiFiles).subscribe({ //sendData
            next: (response) => {
              /*   console.log("Response: ", response) */
              this.msgService.success('Contratti è stato salvato con successo!');

              setTimeout(()=>{
                this.router.navigate([`/contratti-locazione`])
              },2000)

            },
            error: (err) => {
              if (err.status === 400) {
                this.errorMsg = 'Compila tutti i campi obbligatori';
              }
              else if (err.status === 422) {
                this.errorMsg = 'Campi di input non validi o contenuto esistente inviato! Controlla nuovamente i tuoi dati!';
              }
              else if (err.status === 415) {
                this.errorMsg = "Tipo di media non supportato. Controlla il formato del file o della richiesta.";
              }
              else {
                this.errorMsg = err.error.message;
              }
              this.msgService.error(this.errorMsg);
            },
            complete: () => {
              /* this.router.navigate(['/contratti-locazione']) */
            }
          })
        }
      })
    }
    else {
      return;
    }
  }

  resetForm() {
    this.addForm.reset();
  }

   
  handleRefresh(event: any) {
    this.resetForm();
     event.detail.complete(); 

}

  async cancelInputs() {
    const alert = await this.alertController.create({
      header: 'Annulla',
      message: 'Vuoi annullare l\'inserimento del nuovo contratto? I dati non salvati verranno persi.',
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
            /*  this.router.navigate(['/contratti']); */
          }
        }
      ],
      cssClass: 'custom-annulla-alert'
    });

    await alert.present();
  }

}
/**
 * {
"dataInizio": "2024-01-20",
"dataFine": null,
"canoneMensile": 600,
"statoContratto": "ATTIVO",
"descrizione": "Contratto di locazione appartamento",
"unitaImmobiliare": {
    "id": 21
},
"intestatari": [
    {
        "intestatario": {
            "id": 61
        },
        "dataInizio": "2024-03-20"
    }
]
}
 */
/*
{
  "dataInizio": "2025-01-15",
    "dataFine": null,
      "canoneMensile": 900,
        "statoContratto": "ATTIVO",
          "descrizione": "test45",
            "unitaImmobiliare":
  { "id": 44 },
  "intestatari":
  [
    {
      "intestatario": { "id": 121 },
      "dataInizio": "2025-01-15"
    }
  ],
    "documenti": []
}*/