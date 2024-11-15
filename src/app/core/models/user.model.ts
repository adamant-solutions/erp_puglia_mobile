
export interface User {
    id?: string;
    nome: string;
    cognome: string;
    codice_fiscale: string;
    email: string;
    role?: Role;
    //...
}
export enum Role {
   citizen = 'Cittadino',
   operator = 'Operatori',
   maintainers = 'Manutentori',
   //...
}