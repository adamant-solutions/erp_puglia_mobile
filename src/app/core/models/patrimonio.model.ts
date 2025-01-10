

export interface Patrimonio {
  id: number
  createDate: string
  lastUpdateDate: string
  metriQuadri: number
  quartiere: string
  zona: string
  classeEnergetica: string
  tipoAmministrazione: string
  statoDisponibilita: string
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
  tipoDocumento: TipoDocumento
  dataDocumento: string
  percorsoFile: string
  descrizione: string
}

export enum TipoDocumento {
  CATASTALE = "CATASTALE",
  /* certificazione energetica
  planimetria
  certificato idoneità impianti */
}
