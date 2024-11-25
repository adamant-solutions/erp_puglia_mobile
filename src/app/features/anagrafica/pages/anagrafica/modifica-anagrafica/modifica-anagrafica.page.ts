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
        id: [this.userData.cittadino.id, Validators.required],
        codiceFiscale: [this.userData.cittadino.codiceFiscale,Validators.required],
        nome: [this.userData.cittadino.nome, Validators.required],
        cognome: [this.userData.cittadino.cognome, Validators.required],
        dataDiNascita: [{ value: formattedDataNascita, disabled: true },Validators.required],
        /*  luogo_nascita: this.fb.group({
           comune: [this.userData.cittadino.luogo_nascita.comune],
           provincia: [this.userData.cittadino.luogo_nascita.provincia],
           stato: [this.userData.cittadino.luogo_nascita.stato],
         }), */
        genere: [this.userData.cittadino.genere, Validators.required],
        cittadinanza: [this.userData.cittadino.cittadinanza, Validators.required],
        createDate: [{ value: formattedDataCreato, disabled: true }, Validators.required],
        lastUpdateDate: [{ value: formattedDataModificato, disabled: true }, Validators.required],
      }),
      /*  residenza: this.fb.group({
         indirizzo: [this.userData.residenza.indirizzo],
         civico: [this.userData.residenza.civico],
         cap: [this.userData.residenza.cap],
         comune_residenza: [this.userData.residenza.comune_residenza],
         provincia_residenza: [this.userData.residenza.provincia_residenza],
         stato_residenza: [this.userData.residenza.stato_residenza],
       }),
       contatti: this.fb.group({
         telefono: [this.userData.contatti.telefono],
         email: [this.userData.contatti.email],
         pec: [this.userData.contatti.pec],
       }),
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
    this.userForm.controls['cittadino'].patchValue({
      id: this.userData.cittadino.id,
      codiceFiscale: this.userData.cittadino.codiceFiscale,
      nome: this.userData.cittadino.nome,
      cognome: this.userData.cittadino.cognome,
      dataDiNascita: this.datePipe.transform(this.userData.cittadino.dataDiNascita, 'dd/MM/yyyy'),
      genere: this.userData.cittadino.genere,
      cittadinanza: this.userData.cittadino.cittadinanza,
    });

  }

  onSubmit() {
    /* console.log("After: ", this.userForm.getRawValue()) */
    const data = {
      id: this.userData.id,
      createDate: this.userData.createDate,
      lastUpdateDate: this.userData.lastUpdateDate,
      cittadino: {
        id: this.userData.cittadino.id,
        createDate: this.userData.cittadino.createDate,
        lastUpdateDate: this.userData.cittadino.lastUpdateDate,
        nome: this.userForm?.get('cittadino')?.get('nome')?.value,
        cognome: this.userForm?.get('cittadino')?.get('cognome')?.value,
        codiceFiscale: this.userForm?.get('cittadino')?.get('codiceFiscale')?.value,
        genere: this.userForm?.get('cittadino')?.get('genere')?.value,
        cittadinanza: this.userForm?.get('cittadino')?.get('cittadinanza')?.value,
        dataDiNascita: this.userData.cittadino.dataDiNascita,
      }
    }
 
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
