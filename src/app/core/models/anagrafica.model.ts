export interface LuogoNascita {
  comune: string;
  provincia: string;
  stato: string;
}

export interface Cittadino {
  id: string;
  codice_fiscale: string;
  nome: string;
  cognome: string;
  data_nascita: string;
  luogo_nascita: LuogoNascita;
  genere: string; //M ,F,N
  cittadinanza: string;
}


export interface Residenza {
  indirizzo: string;
  civico: string;
  cap: string;
  comune_residenza: string;
  provincia_residenza: string;
  stato_residenza: string;
}


export interface Contatti {
  telefono: string;
  email: string;
  pec: string;
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
  data_creazione: string;
  data_ultima_modifica: string;
  cittadino: Cittadino;
  residenza: Residenza;
  contatti: Contatti;
  documenti_identita: DocumentoIdentita[];
  altri_dettagli: AltriDettagli;
}
