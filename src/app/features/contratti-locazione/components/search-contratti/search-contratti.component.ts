import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-search-contratti',
  templateUrl: './search-contratti.component.html',
  styleUrls: ['./search-contratti.component.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule,FormsModule]
})
export class SearchContrattiComponent  implements OnInit {


    indirizzo= '';
    canoneMensileMin= '';
    canoneMensileMax= '';
    dataInizioFrom= '';
    dataInizioTo= '';
    dataFineTo= '';

   

  constructor(private modalController: ModalController,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {}

  ondataInizioFromChange(data: any) {
   // console.log(data);
    const formattedDate =  this.datePipe.transform(data, 'YYYY-MM-dd')!;
    this.dataInizioFrom = formattedDate;
   // console.log(formattedDate)
  }

  ondataInizioToChange(data:any){
    const formattedDate =  this.datePipe.transform(data, 'YYYY-MM-dd')!;
    this.dataInizioTo = formattedDate;
  }
 
  ondataFineToChange(data:any){
    const formattedDate =  this.datePipe.transform(data, 'YYYY-MM-dd')!;
    this.dataFineTo = formattedDate;
  }

  search() {
    const searchParams = {
      indirizzo: this.indirizzo,
      canoneMensileMin: this.canoneMensileMin,
      canoneMensileMax: this.canoneMensileMax,
      dataInizioFrom: this.dataInizioFrom,
      dataInizioTo: this.dataInizioTo,
      dataFineTo: this.dataFineTo
    };

    this.modalController.dismiss(searchParams);
  }

  dismiss() {
    this.modalController.dismiss();
  }


 
}
