import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, PopoverController } from '@ionic/angular';
import { StatoContratto } from 'src/app/core/models/contratti.model';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-contratti-new',
  templateUrl: './contratti-new.page.html',
  styleUrls: ['./contratti-new.page.scss'],
})
export class ContrattiNewPage implements OnInit {

  pageTitle: string = "Nuovo contratto";
  addForm!: FormGroup;
  submitted = false;
  errorMsg: string = '';
  statoContratti: StatoContratto[] = ['ATTIVO','SCADUTO', 'DISDETTO', 'ANNULLATO'];
  patrimonioList : Patrimonio[] = [];
  filteredPatrimonioList: Patrimonio[]= [];
  searchText: string = '';
  @ViewChild('popoverContent') popoverContent: any;

  
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  constructor(
    private contrattiSvc: ContrattiService,
    private datePipe: DatePipe,
    private msgService: MessagesService,
    private alertService: AlertService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private platform: Platform) { }

  ngOnInit() {
    this.initForm();

    /* per momentin jane patrimoniot ne pagina=0, por duhet te shfaqen vetem patrimoniot e lira  */
    if (this.platform.is('hybrid')) {
      this.getListInNative();
    }
    else{
      this.getList();
    }
    this.filteredPatrimonioList = [...this.patrimonioList];
}

getList(){
  this.route.data.subscribe({
    next: (data) => {
      const responseData = data['patrimonioResolver']
      this.patrimonioList = responseData.body
    },
    error: (err) => {
      console.log(err)
    }
  });
}


getListInNative() { 
  this.route.data.subscribe({
    next: (data) => {
      const responseData = data['patrimonioResolver']
      if(this.platform.is('hybrid')){
        this.patrimonioList = responseData.data
      }
      else {
        this.patrimonioList = responseData
      }
    },
    error: (err) => {
      console.log("Error: ",err)
    }
  });
}

 private initForm(){
    this.addForm = new FormGroup({
      dataInizio: new FormControl(null, Validators.required),
      dataFine: new FormControl(null),
      canoneMensile: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]*\.?[0-9]+$')]),
      statoContratto: new FormControl(null, Validators.required),
      descrizione: new FormControl(null),
      unitaImmobiliare: new FormControl(null,Validators.required),
      intestatari: new FormArray([]),
  })
}


onDataInizioChange(event: any) {
  const selectedDate = new Date(event);
  const isoDate = selectedDate.toISOString()
  this.addForm.get('dataInizio')?.setValue(isoDate);
}

onDataFineChange(event: any) {
  const selectedDate = new Date(event);
  const isoDate = selectedDate.toISOString()
  this.addForm.get('dataFine')?.setValue(isoDate);
}


  formatDisplayInizioDate(){
    const dateValue = this.addForm?.get('dataInizio')?.value;
    
    if (!dateValue) return '';
  
    const date = new Date(dateValue);
    return this.formatDateToDDMMYYYY(date);

}

formatDisplayFineDate(){
  const dateValue = this.addForm?.get('dataFine')?.value;
  
  if (!dateValue) return '';

  const date = new Date(dateValue);
  return this.formatDateToDDMMYYYY(date);
 }

// Format date to DD-MM-YYYY
formatDateToDDMMYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

  onSubmit(){
console.log(this.addForm.value)
 }

 resetForm() {
  this.addForm.reset();
}


async cancelInputs() {
  const alert = await this.alertController.create({
    header: 'Annulla',
    message: 'Vuoi annullare l\'inserimento del nuovo contratto? I dati non salvati verranno persi.',
    buttons: [
      {
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Sì',
        role: 'confirm',
        handler: () => {
          this.resetForm();
          /*  this.router.navigate(['/contratti']); */
        }
      }
    ],
    cssClass: 'custom-annulla-alert'
  });

  await alert.present();
}

}
