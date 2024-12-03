import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule]
})
export class SearchModalComponent  implements OnInit {

  codiceFiscale = '';
  nome = '';
  cognome = '';

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
  }

  search() {
    const searchParams = {
      codiceFiscale: this.codiceFiscale,
      nome: this.nome,
      cognome: this.cognome
    };

    this.modalController.dismiss(searchParams);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
