import {Component, OnInit} from '@angular/core';
import {Role, User} from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userLoggedIn: User = {
    nome: 'Mario',
    cognome: 'Rossi',
    codice_fiscale: 'RSSMRA80A01H501Z',
    email: 'mario.rossi@example.com',
    role: Role.citizen
  };

  constructor() {
  }

  ngOnInit() {
  }

}
