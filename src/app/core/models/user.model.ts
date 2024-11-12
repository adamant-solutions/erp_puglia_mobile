
export interface User {
    id?: string;
    nome: string;
    cognome: string;
    codice_fiscale: string;
    role?: Role;
    //...
}
enum Role {
   citizen = 'Cittadino',
   operator = 'Operatori',
   maintainers = 'Manutentori',
   //...
}