

export interface Patrimonio {
  id: number
  createDate: string
  lastUpdateDate: string
  metriQuadri: number
  quartiere: string
  zona: string
  classeEnergetica: string
  tipoAmministrazione: TipoAmministrazione;
  statoDisponibilita: StatoDisponibilita;
  descrizione: string
  comune: string
  provincia: string
  indirizzo: string
  civico: string
  sezioneUrbana: string
  foglio: string
  particella: string
  subalterno: string
  categoriaCatastale: string
  classeCatastale: string
  renditaCatastale: number
  consistenzaCatastale: number
  piano: string
  documenti: Documenti[]
}

export interface Documenti {
  id?: number
  createDate?: string
  lastUpdateDate?: string
  contentType?: any;
  tipoDocumento: TipoDocumento;
  dataDocumento: string
  percorsoFile: any
  descrizione: string
}


export type TipoAmministrazione = "DIRETTA" | "INDIRETTA" | "MISTA";
export type StatoDisponibilita = "DISPONIBILE" | "OCCUPATO" | "IN_MANUTENZIONE" | "SFITTO" | "NON_DISPONIBILE";
export type TipoDocumento = 'CATASTALE' | "CERTIFICAZIONE_ENERGETICA" | "TAVOLA_PROGETTO" | "ATTO_PROVENIENZA" | "ALTRO";
