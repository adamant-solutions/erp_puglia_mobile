import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.page.html',
  styleUrls: ['./patrimonio.page.scss'],
})
export class PatrimonioPage implements OnInit {

  pageTitle: string = "patrimonio";
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.snapshot.data['patrimonioResolver'];
   // console.log(data)
  }


}
