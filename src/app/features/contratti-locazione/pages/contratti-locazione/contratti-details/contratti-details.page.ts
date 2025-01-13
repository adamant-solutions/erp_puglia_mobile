import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Contratti } from 'src/app/core/models/contratti.model';

@Component({
  selector: 'app-contratti-details',
  templateUrl: './contratti-details.page.html',
  styleUrls: ['./contratti-details.page.scss'],
})
export class ContrattiDetailsPage implements OnInit {

  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute)
  private platform = inject(Platform);
  contrattiData!: Contratti;
  
  constructor() { }
  ngOnInit() {
    if (this.platform.is('hybrid')) {
      this.getContrattiInHybrid()
    }
    else {
      this.getContratti()
    }
  }

  getContratti() {
    this.activeRoute.data.subscribe({
      next: (data) => {
        this.contrattiData = data['contrattiByIdResolver']
        /*  console.log(this.contrattiData) */
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getContrattiInHybrid() {
    this.activeRoute.data.subscribe({
      next: (data) => {
        
         console.log("Details:" , data) 
        this.contrattiData = data['contrattiByIdResolver'].data
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  

}
