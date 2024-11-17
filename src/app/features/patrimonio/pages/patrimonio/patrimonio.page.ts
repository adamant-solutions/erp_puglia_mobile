import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InfiniteScrollCustomEvent} from '@ionic/angular';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.page.html',
  styleUrls: ['./patrimonio.page.scss'],
})
export class PatrimonioPage implements OnInit {

  pageTitle: string = "patrimonio";
  patrimonio = ["patrimonio1", "patrimonio2", "patrimonio3", "patrimonio4", "patrimonio5", "patrimonio6", "patrimonio7", "patrimonio8", "patrimonio9", "patrimonio10", "Test", "Ertet", "Asdss", "Kastr", "Od"];
  results = [...this.patrimonio];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data['patrimonioResolver'];
    // console.log(data)
  }

  handleInput(event: any) {
    const searchItem = event.detail.value;
    this.results = this.patrimonio.filter((d) => d.toLowerCase().indexOf(searchItem.toLowerCase()) > -1);
    /* console.log(this.results) */
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
