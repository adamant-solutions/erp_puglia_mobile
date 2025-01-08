import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';

@Component({
  selector: 'app-modifica-patrimonio',
  templateUrl: './modifica-patrimonio.page.html',
  styleUrls: ['./modifica-patrimonio.page.scss'],
})
export class ModificaPatrimonioPage implements OnInit {

  patrimonioData!: Patrimonio;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.patrimonioData = data['patrimonioByIdResolver']
       
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
