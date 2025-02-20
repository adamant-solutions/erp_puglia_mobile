import { Contatti, DocumentoIdentita, LuogoNascita, Residenza } from "./anagrafica.model"

export interface Contratti {
  id: number
  createDate: string
  lastUpdateDate: string
  dataInizio: string
  dataFine: string
  canoneMensile: number
  statoContratto: StatoContratto;
  descrizione: string
  unitaImmobiliare: {
    id: number;
  };
  intestatari: Intestatari[]
  intestatariAttuali: IntestatariAttuali[]
  intestatariStorici: any[]
  documenti?: DocumentoContratto[] //documenti contratti
}


export type StatoContratto = 'ATTIVO' | 'SCADUTO' | 'DISDETTO' | 'ANNULLATO';


export interface Intestatari {
  id: number
  createDate: string
  lastUpdateDate: string
  intestatario: number
  dataInizio: string
  dataFine: any
  motivoFine: any
}

export interface IntestatariAttuali {
  id: number
  createDate: string
  lastUpdateDate: string
  cittadino: Cittadino
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
  residenza?: Residenza
  contatti?: Contatti
  luogo_nascita?: LuogoNascita
  documenti_identita?: DocumentoIdentita[]
}

export interface DocumentoContratto {
  id?: number;
  nomeFile: string;
  contenuto?: any;
  contentType?: string;
}