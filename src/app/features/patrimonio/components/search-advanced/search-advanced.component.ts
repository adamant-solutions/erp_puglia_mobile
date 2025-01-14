import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { StatoDisponibilita } from 'src/app/core/models/patrimonio.model';
import { CapitalizePipe } from 'src/app/core/pipes/capitalize.pipe';
import { PatrimonioSearchParams } from 'src/app/core/resolvers/patrimonio.resolver';


@Component({
  selector: 'app-search-advanced',
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,NgFor,CapitalizePipe]
})
export class SearchAdvancedComponent  implements OnInit {

  searchParams: PatrimonioSearchParams = {};


  comune = '';
  indirizzo = '';
  statoDisponibilita = '';
  statoDisponibilitas: StatoDisponibilita[] = ["DISPONIBILE" , "OCCUPATO" , "IN_MANUTENZIONE" , "SFITTO" , "NON_DISPONIBILE"];
  
  constructor(private modalController: ModalController,private route: ActivatedRoute) { }

  ngOnInit() {
  }

  search() {
    this.searchParams = {
      comune: this.comune,
      indirizzo: this.indirizzo,
      statoDisponibilita: this.statoDisponibilita
    };

    this.modalController.dismiss(this.searchParams);
  }

  selectStato(event: any){
      this.statoDisponibilita = event.detail.value;
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
