export interface LuogoNascita {
  comune: string;
  provincia: string;
  stato: string;
}

export interface Cittadino {
  id: number
  createDate: string
  lastUpdateDate: string
  nome: string
  cognome: string
  codiceFiscale: string
  genere: string
  cittadinanza: string
  dataDiNascita: string
  residenza: Residenza
  contatti: Contatti
  luogo_nascita: LuogoNascita
}

export interface Residenza {
  id: number
  createDate: string
  lastUpdateDate: string
  indirizzo: string
  civico: string
  cap: string
  comuneResidenza: string
  provinciaResidenza: string
  statoResidenza: string
}

export interface Contatti {
  id: number
  createDate: string
  lastUpdateDate: string
  telefono: string
  cellulare: string
  email: string
  pec: string
}

export interface DocumentoIdentita {
  tipo_documento: string;
  numero_documento: string;
  data_emissione: string;
  data_scadenza: string;
  ente_emittente: string;
}

export interface AltriDettagli {
  stato_civile: string;
  data_ultimo_aggiornamento: string;
}


export interface Anagrafica {
  id: string;
  createDate: string
  lastUpdateDate: string
  cittadino: Cittadino;
  documenti_identita: DocumentoIdentita[];
  altri_dettagli: AltriDettagli;
}
