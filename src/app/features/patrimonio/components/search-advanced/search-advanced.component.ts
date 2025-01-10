import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-advanced',
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule]
})
export class SearchAdvancedComponent  implements OnInit {

  comune = '';
  zona = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  search() {
    const searchParams = {
      comune: this.comune,
      zona: this.zona,
    };

    this.modalController.dismiss(searchParams);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
