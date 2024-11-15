import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica-details',
  templateUrl: './anagrafica-details.page.html',
  styleUrls: ['./anagrafica-details.page.scss'],
})
export class AnagraficaDetailsPage implements OnInit {

  userData: Anagrafica = {
    cittadino: {
      id: "12345678-1234-1234-1234-123456789012",
      codice_fiscale: "RSSMRA80A01H501Z",
      nome: "Mario",
      cognome: "Rossi",
      data_nascita: "1980-01-01",
      luogo_nascita: {
        comune: "Roma",
        provincia: "RM",
        stato: "Italia"
      },
      sesso: "M",
      cittadinanza: "Italiana"
    },
    residenza: {
      indirizzo: "Via Roma",
      civico: "10",
      cap: "00100",
      comune_residenza: "Roma",
      provincia_residenza: "RM",
      stato_residenza: "Italia"
    },
    contatti: {
      telefono: "+39 0612345678",
      email: "mario.rossi@example.com",
      pec: "mario.rossi@pec.it"
    },
    documenti_identita: [
      {
        tipo_documento: "carta d'identità",
        numero_documento: "AB1234567",
        data_emissione: "2015-05-10",
        data_scadenza: "2025-05-10",
        ente_emittente: "Comune di Roma"
      }
    ],
    altri_dettagli: {
      stato_civile: "coniugato",
      data_ultimo_aggiornamento: "2024-11-09"
    }
  }; 
 
  breadCrumbs = [{ name: 'Anagrafica', url: '/anagrafica' }, { name: 'Anagrafica Dettagli', url: [] }]  
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    /* console.log(this.userForm.value);  */ 
  }
  
  initializeForm(){
    this.userForm = this.fb.group({
      cittadino: this.fb.group({
        id: [this.userData.cittadino.id],
        codice_fiscale: [this.userData.cittadino.codice_fiscale],
        nome: [this.userData.cittadino.nome],
        cognome: [this.userData.cittadino.cognome],
        data_nascita: [this.userData.cittadino.data_nascita],
        luogo_nascita: this.fb.group({
          comune: [this.userData.cittadino.luogo_nascita.comune],
          provincia: [this.userData.cittadino.luogo_nascita.provincia],
          stato: [this.userData.cittadino.luogo_nascita.stato],
        }),
        sesso: [this.userData.cittadino.sesso],
        cittadinanza: [this.userData.cittadino.cittadinanza]
      }),
      residenza: this.fb.group({
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
        data_emissione: [doc.data_emissione],
        data_scadenza: [doc.data_scadenza],
        ente_emittente: [doc.ente_emittente]
      }))),
      altri_dettagli: this.fb.group({
        stato_civile: [this.userData.altri_dettagli.stato_civile],
        data_ultimo_aggiornamento: [this.userData.altri_dettagli.data_ultimo_aggiornamento],
      }),
      
    })
    this.userForm.disable();

  }

  get documentiIdentitaForms() {
    return (this.userForm.get('documenti_identita') as FormArray).controls;
  }
}
