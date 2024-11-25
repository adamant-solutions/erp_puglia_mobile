import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';

@Component({
  selector: 'app-nuova-anagrafica',
  templateUrl: './nuova-anagrafica.page.html',
  styleUrls: ['./nuova-anagrafica.page.scss'],
})
export class NuovaAnagraficaPage implements OnInit {
  pageTitle: string = "Nuova anagrafica";
  addForm!: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder,private anagraficaSvc: AnagraficaService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.initializeForm();
  }


  initializeForm() {
    this.addForm = this.fb.group({
      id: -1,
      cittadino: this.fb.group({
        codiceFiscale: ['',[Validators.required]],
        nome: ['',[Validators.required]],
        cognome: ['',[Validators.required]],
        dataDiNascita: ['',[Validators.required]],
         luogo_nascita: this.fb.group({
          comune: [],
          provincia: [],
          stato: [],
        }), 
        genere: ['',[Validators.required]],
        cittadinanza: ['',[Validators.required]]
      }),
      residenza: this.fb.group({
        indirizzo: [],
        civico: [],
        cap: [],
        comune_residenza: [],
        provincia_residenza: [],
        stato_residenza: [],
      }),
      contatti: this.fb.group({
        telefono: [],
        email: [],
        pec: [],
      }),
      documenti_identita: this.fb.array([]),
      altri_dettagli: this.fb.group({
        stato_civile: [],
        data_ultimo_aggiornamento: [],
      }), 

    })
  }

  get documentiIdentitaForms() {
    return (this.addForm.get('documenti_identita') as FormArray).controls;
  }


  addDocumentiGroup() {
    const documentiGroup = this.fb.group({
      tipo_documento: [],
      numero_documento: [],
      data_emissione: [],
      data_scadenza: [],
      ente_emittente: []
    });

    (this.addForm.get('documenti_identita') as FormArray).push(documentiGroup);
  }

  removeDocumentiGroup(index: number) {
    (this.addForm.get('documenti_identita') as FormArray).removeAt(index);
  }

  onDataChange(data: any) {
    // const formattedDate = new Date(data.value).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }); //dd/mm/yyyy
     const formattedDate =  this.datePipe.transform(data, 'YYYY-MM-dd');
     this.addForm?.get('cittadino.dataDiNascita')?.setValue(formattedDate);
   }

  onSubmit(){
    const anagraficaData = this.addForm.value;
   console.log(this.addForm.value) 
   if(!this.addForm.valid){
    return;
   }
   else {
    this.anagraficaSvc.addAnagrafica(anagraficaData).subscribe({
      next: (response) => {
        console.log("Response: ", response)
        alert("was posted")
      },
      error: (err) => {
        this.errorMsg = "Error!" + err.message;
        console.log(this.errorMsg)
      }
     })
   }
  }



}
