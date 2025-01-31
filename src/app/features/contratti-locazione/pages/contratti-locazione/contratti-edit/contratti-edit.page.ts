import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonModal, ModalController, Platform } from '@ionic/angular';
import { Contratti, StatoContratto } from 'src/app/core/models/contratti.model';
import { ModelLight } from 'src/app/core/models/model-light.model';
import { ContrattiService } from 'src/app/core/services/contratti.service';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-contratti-edit',
  templateUrl: './contratti-edit.page.html',
  styleUrls: ['./contratti-edit.page.scss'],
})
export class ContrattiEditPage implements OnInit {
  pageTitle: string = "Modifica Contratto";
  contrattoForm!: FormGroup;
  contrattoData!: Contratti;
  submitted = false;
  errorMsg: string = '';
  statoContratti: StatoContratto[] = ['ATTIVO', 'SCADUTO', 'DISDETTO', 'ANNULLATO'];
  patrimonioList: ModelLight[] = [];
  filteredPatrimonioList: ModelLight[] = [];
  anagraficaList: ModelLight[] = [];
  filteredIntestatariList: ModelLight[] = [];
  searchText: string = '';
  @ViewChild('modal') modal!: IonModal;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selectedItem: string = '';
  formData: Contratti = {
    id: 0,
    createDate: '',
    lastUpdateDate: '',
    dataInizio: '',
    dataFine: '',
    canoneMensile: 0,
    statoContratto: 'ATTIVO',
    descrizione: '',
    unitaImmobiliare: {
      id: 0
    },
    intestatari: [],
    intestatariAttuali: [],
    intestatariStorici: [],
    documenti: []
  }

  constructor(private datePipe: DatePipe,
    private contrattiSrv: ContrattiService,
    private msgService: MessagesService,
    private alertController: AlertController,
    private modalController: ModalController,
    private platform: Platform,
    private fb: FormBuilder) { 
    }


  ngOnInit() {
    this.getList()
    this.initForm()
    this.filteredPatrimonioList = [...this.patrimonioList];
    this.filteredIntestatariList = [...this.anagraficaList];
}

getList(){

  this.route.data.subscribe({
    next: (data) => {
      if(this.platform.is('hybrid')){
        this.contrattoData = data['contrattiByIdResolver'].data;
        this.patrimonioList = data['unitaImmobiliareResolver'].data;
        this.anagraficaList = data['intestatariResolver'].data;
        this.contrattoData.createDate = this.datePipe.transform(this.contrattoData.createDate, 'dd/MM/yyyy')!;
        this.contrattoData.lastUpdateDate = this.datePipe.transform(this.contrattoData.lastUpdateDate, 'dd/MM/yyyy')!;
       this.contrattoData.documenti = this.contrattoData.documenti || [];
      }
      else{
      this.contrattoData = data['contrattiByIdResolver'];
      this.patrimonioList = data['unitaImmobiliareResolver'].body;
      this.anagraficaList = data['intestatariResolver'].body;
      this.contrattoData.createDate = this.datePipe.transform(this.contrattoData.createDate, 'dd/MM/yyyy')!;
      this.contrattoData.lastUpdateDate = this.datePipe.transform(this.contrattoData.lastUpdateDate, 'dd/MM/yyyy')!;
      
      this.contrattoData.documenti = this.contrattoData.documenti || [];
      }

    },
    error: (err) => {
      console.log(err)
    }
  });
  
}

private initForm() {
  this.contrattoForm= this.fb.group({
    dataInizio: this.contrattoData.dataInizio,
    dataFine: this.contrattoData.dataFine,
    canoneMensile: this.contrattoData.canoneMensile,
    statoContratto: this.contrattoData.statoContratto,
    descrizione: this.contrattoData.descrizione,
    unitaImmobiliare: { id: this.contrattoData.unitaImmobiliare },
    intestatari: this.fb.array([])
  /*   intestatari: {
      intestatario : {
        id: 
      }
    } */
  });
  const intestatariArray = this.contrattoForm.get('intestatari') as FormArray;
  this.contrattoData.intestatari.forEach((intestatario: any) => {
    intestatariArray.push(this.createIntestatarioGroup(intestatario));
  });
   //console.log(intestatariArray.controls)
}

  private createIntestatarioGroup(intestatario?: any): FormGroup {
    return this.fb.group({
      //id: [intestatario?.id || null],
      intestatario: this.fb.group({
        id: [intestatario?.intestatario || null, Validators.required]
      }),
      dataInizio: [intestatario?.dataInizio || null, Validators.required]
    });
  } 

  get intestatari(): FormArray {
    return this.contrattoForm.get('intestatari') as FormArray;
  }

  addIntestatario() {
    this.intestatari.push(this.createIntestatarioGroup());
  }
 
  removeIntestatario(index: number) {
    this.intestatari.removeAt(index);
  }

  updateDate(field: string, event: any) {
    const value = event.detail.value?.split('T')[0];
    this.contrattoForm.get(field)?.setValue(value);
    this.dismissModal();
  }

  updateIntestatarioDate(index: number, event: any) {
    const value = event.detail.value?.split('T')[0];
    this.intestatari.at(index).get('dataInizio')?.setValue(value);
    this.dismissModal();
  }

  selectPatrimonio(patrimonio: any) {
    this.contrattoForm.get('unitaImmobiliare')?.setValue(patrimonio);
    this.dismissModal();
  }

  selectIntestatario(anagrafica: any, index: number) {
    this.intestatari.at(index).get('intestatario.id')?.setValue(anagrafica.id);
    this.dismissModal();
  }

  // Display 
  get selectedPatrimonio() {
    const id = this.contrattoForm.get('unitaImmobiliare')?.value;
    const found = this.patrimonioList.find(p => p.id === id.id);
    return found ? `${found.descrizione}` : '';
  }

  isSelectedPatrimonio(item: any): boolean {
    const currentValue = this.contrattoForm.get('unitaImmobiliare')?.value;
    return currentValue && currentValue.id === item.id;
  }

  isSelectedIntestatari(item: any, index: number) : boolean{
    const currentValue =  this.intestatari.at(index).get('intestatario')?.value
    //const currentValue = this.contrattoForm.get('unitaImmobiliare')?.value;
    return currentValue && currentValue.id === item.id;
  }

  //Display
  getIntestatarioDisplay(index: number): string {
    const id = this.intestatari.at(index).get('intestatario.id')?.value;
    const found = this.anagraficaList.find(a => a.id === id);
    return found ? `${found.descrizione}` : '';
  }


  filterItemsPatrimonio(event: any) {
    const searchTerm = (event.target.value || '').toLowerCase();
    this.filteredPatrimonioList = this.patrimonioList.filter(p =>
      p.descrizione.toLowerCase().includes(searchTerm)
    );
  }

  filterItemsAnagrafica(event: any) {
    const searchTerm = (event.target.value || '').toLowerCase();
    this.filteredIntestatariList = this.anagraficaList.filter(a =>
      `${a.descrizione}`.toLowerCase().includes(searchTerm)
    );
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  cancelModifiedInputs(){}
  
  onSubmit() {

    const sendContratto = this.contrattoForm.getRawValue();

    const unitaImmobiliareID = this.contrattoForm.get('unitaImmobiliare')?.getRawValue()?.id
    
    const sendIntestatari = sendContratto.intestatari?.map((intestatario: any) => ({
      intestatario: {
        id: intestatario.intestatario.id
      },
      dataInizio: this.datePipe.transform(intestatario.dataInizio, 'yyyy-MM-dd')
    })) || [];
  
    const sendData = {
      ...sendContratto,
      dataInizio: this.datePipe.transform(sendContratto.dataInizio, 'yyyy-MM-dd'),
      dataFine: this.datePipe.transform(sendContratto.dataFine!, 'yyyy-MM-dd'),
      unitaImmobiliare: { id: unitaImmobiliareID },
      intestatari: sendIntestatari
    };

    console.log(sendData)

    if (this.contrattoForm.invalid) {
      return;
    }
    else{

    }
  }

}
