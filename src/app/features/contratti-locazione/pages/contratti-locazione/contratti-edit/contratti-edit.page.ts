import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contratti-edit',
  templateUrl: './contratti-edit.page.html',
  styleUrls: ['./contratti-edit.page.scss'],
})
export class ContrattiEditPage implements OnInit {
  pageTitle: string = "Modifica Contratto";

  constructor() { }

  ngOnInit() {
  }

  cancelModifiedInputs(){}
  
  onSubmit(){

  }

}
