import { DatePipe } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Anagrafica} from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica-details',
  templateUrl: './anagrafica-details.page.html',
  styleUrls: ['./anagrafica-details.page.scss'],
})
export class AnagraficaDetailsPage implements OnInit {

  userData!: Anagrafica;

  breadCrumbs = [{name: 'Anagrafica', url: '/anagrafica'}, {name: 'Anagrafica Dettagli', url: []}]
  userForm!: FormGroup;

  constructor(private fb: FormBuilder,private datePipe: DatePipe,private route: ActivatedRoute) {
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
    console.log(this.userData);
    this.initializeForm();
    /* console.log(this.userForm.value);  */
  }

  initializeForm() {
    const formattedDataNascita = this.datePipe.transform(this.userData.cittadino.dataDiNascita, 'dd/MM/yyyy');
   /*  const formattedDataUltimoAggiornamento = this.datePipe.transform(this.userData.altri_dettagli.data_ultimo_aggiornamento, 'dd/MM/yyyy'); */
 
    this.userForm = this.fb.group({

      createDate: [this.userData.createDate],
      lastUpdateDate: [this.userData.lastUpdateDate],
      cittadino: this.fb.group({
        id: [this.userData.cittadino.id],
        codiceFiscale: [this.userData.cittadino.codiceFiscale],
        nome: [this.userData.cittadino.nome],
        cognome: [this.userData.cittadino.cognome],
        dataDiNascita: [formattedDataNascita],
       /*  luogo_nascita: this.fb.group({
          comune: [this.userData.cittadino.luogo_nascita.comune],
          provincia: [this.userData.cittadino.luogo_nascita.provincia],
          stato: [this.userData.cittadino.luogo_nascita.stato],
        }), */
        genere: [this.userData.cittadino.genere],
        cittadinanza: [this.userData.cittadino.cittadinanza],
        createDate: [this.userData.cittadino.createDate],
        lastUpdateDate: [this.userData.cittadino.lastUpdateDate],
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
    this.userForm.disable();

  }

  get documentiIdentitaForms() {
    return (this.userForm.get('documenti_identita') as FormArray).controls;
  }

}
