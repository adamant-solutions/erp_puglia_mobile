import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDocumento } from 'src/app/core/models/anagrafica.model';
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
  tipoDocuments = Object.values(TipoDocumento);

  constructor(private fb: FormBuilder,private anagraficaSvc: AnagraficaService,private datePipe: DatePipe,private msgService: MessagesService,private router: Router) { }

  ngOnInit() {
    this.initializeForm();
    /* console.log("Aggiungi init form: ", this.addForm.controls) */
  }


  initializeForm() {
    this.addForm = this.fb.group({
      id: -1,
      cittadino: this.fb.group({
        codiceFiscale: ['',[Validators.required]],
        nome: ['',[Validators.required, Validators.minLength(3)]],
        cognome: ['',[Validators.required, Validators.minLength(3)]],
        dataDiNascita: ['',[Validators.required]],
         luogo_nascita: this.fb.group({
          comune: [],
          provincia: [],
          stato: [],
        }), 
        genere: ['M',[Validators.required]],
        cittadinanza: ['',[Validators.required]],
        residenza: this.fb.group({
          indirizzo: [],
          civico: [],
          cap: [],
          comuneResidenza: [],
          provinciaResidenza: [],
          statoResidenza: [],
        }),
        contatti: this.fb.group({
          telefono: [],
          cellulare: [],
          email: [],
          pec: [],
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
    const documentiGroup = this.fb.group({
      tipo_documento: [],
      numero_documento: [],
      data_emissione: [],
      data_scadenza: [],
      ente_emittente: []
    });

    (this.addForm.get('cittadino.documenti_identita') as FormArray).push(documentiGroup);
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

    
  onSubmit(){
    this.submitted = true;
    const anagraficaData = this.addForm.value;
    console.log(this.addForm.value) 
   if(!this.addForm.valid){
    return;
   }
   else {
    this.anagraficaSvc.addAnagrafica(anagraficaData).subscribe({
      next: (response) => {
      /*   console.log("Response: ", response) */
        this.msgService.success('Dati salvati con successo!');
      },
      error: (err) => {
        if (err.status === 500) {
          this.errorMsg = "Errore interno del server!"
        }
        else if (err.status === 400){
          this.errorMsg = err.message; 
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
  }

  cancelInputs(){
    this.addForm.reset();
  }


}
