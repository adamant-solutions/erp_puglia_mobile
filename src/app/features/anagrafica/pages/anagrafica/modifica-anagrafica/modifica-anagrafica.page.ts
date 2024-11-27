import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-modifica-anagrafica',
  templateUrl: './modifica-anagrafica.page.html',
  styleUrls: ['./modifica-anagrafica.page.scss'],
})
export class ModificaAnagraficaPage implements OnInit {

  userData!: Anagrafica;
  userForm!: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private anagraficaSrv: AnagraficaService,
    private msgService: MessagesService) {
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.userData = data['anagraficaByIdResolver']
      /*   console.log(this.userData) */
      },
      error: (err) => {
        console.log(err)
      }
    });
   // console.log(this.userData);
    this.initializeForm();
    /* console.log(this.userForm.value);  */
  }

  initializeForm() {
    const formattedDataNascita = this.datePipe.transform(this.userData.cittadino.dataDiNascita, 'dd/MM/yyyy');
    const formattedDataCreato = this.datePipe.transform(this.userData.createDate, 'dd/MM/yyyy');
    const formattedDataModificato = this.datePipe.transform(this.userData.lastUpdateDate, 'dd/MM/yyyy');
    /*  const formattedDataUltimoAggiornamento = this.datePipe.transform(this.userData.altri_dettagli.data_ultimo_aggiornamento, 'dd/MM/yyyy'); */

    this.userForm = this.fb.group({
      id: this.userData.id,
      createDate: [{ value: formattedDataCreato, disabled: true }],
      lastUpdateDate: [{ value: formattedDataModificato, disabled: true }],
      cittadino: this.fb.group({
        id: [{ value: this.userData.cittadino.id, disabled: false }, Validators.required],
        codiceFiscale: [{ value: this.userData.cittadino.codiceFiscale, disabled: false },Validators.required],
        nome: [{ value: this.userData.cittadino.nome, disabled: false }, Validators.required],
        cognome: [{ value: this.userData.cittadino.cognome, disabled: false }, Validators.required],
        dataDiNascita: [{ value: formattedDataNascita, disabled: true },Validators.required],
        luogo_nascita: this.fb.group({
           comune: [{ value: this.userData.cittadino?.luogo_nascita?.comune, disabled: false }],
           provincia: [{ value: this.userData.cittadino?.luogo_nascita?.provincia, disabled: false }],
           stato: [{ value: this.userData.cittadino?.luogo_nascita?.stato, disabled: false }],
         }),
        genere: [{ value: this.userData.cittadino.genere, disabled: false }, Validators.required],
        cittadinanza: [{ value: this.userData.cittadino.cittadinanza, disabled: false }, Validators.required],
        createDate: [{ value: formattedDataCreato, disabled: true }, Validators.required],
        lastUpdateDate: [{ value: formattedDataModificato, disabled: true }, Validators.required],
        residenza: this.fb.group({
          id: this.userData.cittadino?.residenza?.id,
          indirizzo: [{ value: this.userData.cittadino?.residenza?.indirizzo , disabled: false }],
          civico: [{ value: this.userData.cittadino?.residenza?.civico , disabled: false }],
          cap: [{ value: this.userData.cittadino?.residenza?.cap, disabled: false }],
          comuneResidenza: [{ value: this.userData.cittadino?.residenza?.comuneResidenza, disabled: false }],
          provinciaResidenza: [{ value: this.userData.cittadino?.residenza?.provinciaResidenza, disabled: false }],
          statoResidenza: [{ value: this.userData.cittadino?.residenza?.statoResidenza, disabled: false }],
          createDate: [{ value: this.userData.cittadino?.residenza?.createDate, disabled: false }],
          lastUpdateDate: [{ value: this.userData.cittadino?.residenza?.lastUpdateDate, disabled: false}],
        }),
        contatti: this.fb.group({
          id: this.userData.cittadino?.contatti?.id,
          telefono: [{ value: this.userData.cittadino?.contatti?.telefono, disabled: false }],
          cellulare: [{ value: this.userData.cittadino?.contatti?.cellulare, disabled: false }],
          email: [{ value: this.userData.cittadino?.contatti?.email, disabled: false }],
          pec: [{ value: this.userData.cittadino?.contatti?.pec, disabled: false }],
          createDate: [{ value: this.userData.cittadino?.contatti?.createDate, disabled: false }],
          lastUpdateDate: [{ value: this.userData.cittadino?.contatti?.lastUpdateDate, disabled: false}],
        }),
      }),
      /* 
       documenti_identita: this.fb.array(
         this.userData.documenti_identita.map(doc => this.fb.group({
           tipo_documento: [doc.tipo_documento],
           numero_documento: [doc.numero_documento],
           data_emissione: [this.datePipe.transform(doc.data_emissione, 'dd/MM/yyyy')],
           data_scadenza: [this.datePipe.transform(doc.data_scadenza, 'dd/MM/yyyy')],
           ente_emittente: [doc.ente_emittente]
         }))),
       altri_dettagli: this.fb.group({
         stato_civile: [this.userData.altri_dettagli.stato_civile],
         data_ultimo_aggiornamento: [formattedDataUltimoAggiornamento],
       }), */

    })
    //  this.userForm.disable();

  }

  get documentiIdentitaForms() {
    return (this.userForm.get('documenti_identita') as FormArray).controls;
  }

  cancelModifiedInputs() {
  this.initializeForm()
  }

  onSubmit() {
    /* console.log("After: ", this.userForm.getRawValue()) */
    this.userForm.patchValue({
      createDate: this.userData.createDate,
      lastUpdateDate: this.userData.lastUpdateDate,
    
    })
    this.userForm.controls['cittadino'].patchValue({
      dataDiNascita: this.userData.cittadino.dataDiNascita,
      createDate: this.userData.cittadino.createDate,
      lastUpdateDate: this.userData.cittadino.lastUpdateDate,
    })
    
    const data = this.userForm.getRawValue()

     /* console.log(data); */
 
    if (!this.userForm.valid) {
      return;
    }
    else {
      this.anagraficaSrv.editAnagrafica(data).subscribe({
        next: (res) => {
          this.msgService.success("Dati salvati con successo!");
          console.log(res)
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
        }
      })
    }
  }
}
