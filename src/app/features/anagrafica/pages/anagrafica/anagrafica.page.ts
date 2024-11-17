import {Component, OnInit} from '@angular/core';
import {InfiniteScrollCustomEvent} from '@ionic/angular';
import {Anagrafica} from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.page.html',
  styleUrls: ['./anagrafica.page.scss'],
})
export class AnagraficaPage implements OnInit {
  pageTitle: string = "anagrafica";

  anagraficaList: Anagrafica[] = [
    {
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
    }];

  results = [...this.anagraficaList];

  constructor() {
  }

  ngOnInit() {
  }

  handleInput(event: any) {
    const searchItem = event.detail.value;
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
