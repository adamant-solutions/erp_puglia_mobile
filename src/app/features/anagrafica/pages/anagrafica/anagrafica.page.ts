import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {InfiniteScrollCustomEvent} from '@ionic/angular';
import {Anagrafica} from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.page.html',
  styleUrls: ['./anagrafica.page.scss'],
})
export class AnagraficaPage implements OnInit {
  pageTitle: string = "anagrafica";

  anagraficaList: Anagrafica[] = [];
  results: Anagrafica [] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.route.data.subscribe({
      next: (data) => {
        this.anagraficaList = data['anagraficaResolver']
        this.results = [...this.anagraficaList]
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  handleInput(event: any) {
    const searchItem = event.detail.value;
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
