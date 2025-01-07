import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InfiniteScrollCustomEvent} from '@ionic/angular';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.page.html',
  styleUrls: ['./patrimonio.page.scss'],
})
export class PatrimonioPage implements OnInit {

  pageTitle: string = "patrimonio";
  patrimonioList : Patrimonio[] = [];
  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.data.subscribe({
      next: (data) => {
        this.patrimonioList = data['patrimonioResolver']
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
