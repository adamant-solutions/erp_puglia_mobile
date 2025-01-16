import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TipoDocumento } from 'src/app/core/models/anagrafica.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-nuova-anagrafica',
  templateUrl: './nuova-anagrafica.page.html',
  styleUrls: ['./nuova-anagrafica.page.scss'],
})
export class NuovaAnagraficaPage implements OnInit {
  pageTitle: string = "Nuova anagrafica";
  addForm!: FormGroup;
  submitted = false;
  errorMsg: string = '';
  tipoDocuments: TipoDocumento[] = ["Carta d'Identità", "Passaporto", "Patente"];
  documentiFiles: any[] =[];
  fileName: string[] = []

  constructor(private fb: FormBuilder,
    private anagraficaSvc: AnagraficaService,
    private datePipe: DatePipe,
    private msgService: MessagesService,
    private router: Router,
    private alertService: AlertService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.initializeForm();
    /* console.log("Aggiungi init form: ", this.addForm.controls) */
  }


  initializeForm() {
    this.addForm = this.fb.group({
      id: -1,
      cittadino: this.fb.group({
        codiceFiscale: ['', [Validators.required, Validators.pattern('[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]')]],
        nome: ['', [Validators.required, Validators.minLength(3)]],
        cognome: ['', [Validators.required, Validators.minLength(3)]],
        dataDiNascita: ['', [Validators.required]],
        luogo_nascita: this.fb.group({
          comune: ['', [Validators.required]],
          provincia: ['', [Validators.required]],
          stato: ['', [Validators.required]],
        }),
        genere: ['M', [Validators.required]],
        cittadinanza: ['', [Validators.required]],
        residenza: this.fb.group({
          indirizzo: ['', [Validators.required]],
          civico: ['', [Validators.required]],
          cap: ['', [Validators.required,Validators.pattern('^[0-9]{5}$')]], //5 characters
          comuneResidenza: ['', [Validators.required]],
          provinciaResidenza: ['', [Validators.required]],
          statoResidenza: ['', [Validators.required]],
        }),
        contatti: this.fb.group({
          telefono: ['', [Validators.required,Validators.pattern('^[+][0-9]+$')]], //+ in beginning dhe digits
          cellulare: ['', [Validators.required,,Validators.pattern('^[0-9]+$')]],
          email: ['', [Validators.required,Validators.email]],
          pec: ['', [Validators.required,Validators.email]],
        }),
        documenti_identita: this.fb.array([]),
        altri_dettagli: this.fb.group({
          stato_civile: [],
          data_ultimo_aggiornamento: [],
        })
      })
    })
  }

  get documentiIdentitaForms() {
    return (this.addForm.get('cittadino.documenti_identita') as FormArray).controls;
  }


  addDocumentiGroup() {
    const MAX_LENGTH = 3;
    const documentiGroup = this.fb.group({
      tipo_documento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]],
      data_emissione: ['', [Validators.required]],
      data_scadenza: ['', [Validators.required]],
      ente_emittente: ['', [Validators.required]],
      nomeFile: [null, [Validators.required]]
    });

    if(this.addForm.get('cittadino.documenti_identita')?.value.length < MAX_LENGTH){
      (this.addForm.get('cittadino.documenti_identita') as FormArray).push(documentiGroup);
    }
   
  }

  removeDocumentiGroup(index: number) {
    (this.addForm.get('cittadino.documenti_identita') as FormArray).removeAt(index);
  }

  isDocumentTypeDisabled(currentIndex: number, documentType: string): boolean {
    return this.documentiIdentitaForms.some((doc, index) => 
      index !== currentIndex && 
      doc.get('tipo_documento')?.value === documentType
    );
  }
  
  onDataDiNascitaChange(data: any) {
    // const formattedDate = new Date(data.value).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }); //dd/mm/yyyy
     const formattedDate =  this.datePipe.transform(data, 'YYYY-MM-dd');
     this.addForm?.get('cittadino.dataDiNascita')?.setValue(formattedDate);
   }

   formatDisplayDataNascita(){
    const dateValue = this.addForm?.get('cittadino.dataDiNascita')?.value;
    
    if (!dateValue) return '';

    const date = new Date(dateValue);
    return this.formatDateToDDMMYYYY(date);
   }

   onDataEmissioneChange(event: any,index: number) {
    const selectedDate = new Date(event);
    const isoDate = selectedDate.toISOString()
    const documentiIdentitaArray = this.addForm.get('cittadino.documenti_identita') as FormArray;
    
    documentiIdentitaArray.at(index).get('data_emissione')?.setValue(isoDate);
    /* console.log(isoDate) */
  }


  formatDisplayDateEmissione(index: number): string {
    const documentiIdentitaArray = this.addForm.get('cittadino.documenti_identita') as FormArray;
    const dateValue = documentiIdentitaArray.at(index).get('data_emissione')?.value;
    
    if (!dateValue) return '';

    const date = new Date(dateValue);
    return this.formatDateToDDMMYYYY(date);
  }


  onDataScadenzaChange(event: any,index: number) {
    const selectedDate = new Date(event);
    const isoDate = selectedDate.toISOString()
    const documentiIdentitaArray = this.addForm.get('cittadino.documenti_identita') as FormArray;
    
    documentiIdentitaArray.at(index).get('data_scadenza')?.setValue(isoDate);
    /* console.log(isoDate) */
  }


  formatDisplayDateScadenza(index: number): string {
    const documentiIdentitaArray = this.addForm.get('cittadino.documenti_identita') as FormArray;
    const dateValue = documentiIdentitaArray.at(index).get('data_scadenza')?.value;
    
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

    onFileSelected(event: any, index: number) {
     
      const file = event.target.files[0];
      if (file) {
        this.fileName[index] = file.name
        this.documentiFiles[index] = file;
      }
    }

    
  onSubmit(){
    this.submitted = true;
    const anagraficaData = this.addForm.value;
    /* console.log(this.addForm.value) */
   //  console.log(this.addForm.controls['cittadino'].get('documenti_identita')?.value) //this.addForm.controls['cittadino']
   if(!this.addForm.valid){
    return;
   }
   else {
    this.alertService.showConfirmation(
      'Conferma i dati personali', 
      'Sei sicuro di voler aggiungere questa anagrafica? Questa azione non può essere annullata.'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.anagraficaSvc.addAnagrafica(anagraficaData,this.documentiFiles).subscribe({
          next: (response) => {
          /*   console.log("Response: ", response) */
            this.msgService.success('Dati salvati con successo!');
          },
          error: (err) => {
            if (err.status === 500) {
              this.errorMsg = "Errore interno del server!"
            }
            else if (err.status === 400){
              this.errorMsg = 'Compila tutti i campi obbligatori'; 
            }
            else if(err.status === 422){
              this.errorMsg = 'Campi di input non validi o contenuto esistente inviato! Controlla nuovamente i tuoi dati!';
            }
             else if(err.status === 415){
              this.errorMsg = "Tipo di media non supportato. Controlla il formato del file o della richiesta.";
            }
            else{
              this.errorMsg = "Error!" + err.message;
            }
            this.msgService.error(this.errorMsg);         
          },
          complete: ()=> {
            this.router.navigate(['/anagrafica'])
          }
         })
      }
    });
   }
  }

  resetForm(){
    this.addForm.reset();
  }


  async cancelInputs() {
    const alert = await this.alertController.create({
      header: 'Annulla',
      message: 'Vuoi annullare l\'inserimento della nuova anagrafica? I dati non salvati verranno persi.',
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
           /*  this.router.navigate(['/anagrafica']); */
          }
        }
      ],
      cssClass: 'custom-annulla-alert'
    });
  
    await alert.present();
  }


}
