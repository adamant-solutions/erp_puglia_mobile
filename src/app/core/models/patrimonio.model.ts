
export interface Patrimonio {
    id?: number;
    edilizia: Edilizia;
    riferimentoDetails: Riferimento,
    //....
}

export interface Edilizia {
    id?: string;
    metri_quadri: number;
    quartiere: string;
    zona: string;
    classe_energetica: string;
    year_of_construction: number;
    province: string;
    //etc...
}
export interface Riferimento {
    id?: string;
    tipologia_di_amministrazione: string;
    stato_di_disponibilita: string;
    tipoSfittanza: string;
    tipologia_di_contratto: string;
    tipo_di_registrazione: string;
    causale_di_cessazione: string;
    //etc...
}