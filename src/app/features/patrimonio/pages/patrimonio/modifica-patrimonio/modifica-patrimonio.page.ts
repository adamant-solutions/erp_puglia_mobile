import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';
import { Comune, comuneList } from '../../../data/comune';
import { Provincia, provinciaList } from '../../../data/provincia';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modifica-patrimonio',
  templateUrl: './modifica-patrimonio.page.html',
  styleUrls: ['./modifica-patrimonio.page.scss'],
})
export class ModificaPatrimonioPage implements OnInit {

  pageTitle: string = "Modifica Patrimonio"
  patrimonioData!: Patrimonio;
  submitted: boolean = false
  formData: Patrimonio = {
    id: 0,
    createDate: '',
    lastUpdateDate: '',
    metriQuadri: 0,
    quartiere: '',
    zona: '',
    classeEnergetica: '',
    tipoAmministrazione: '',
    statoDisponibilita: '',
    descrizione: '',
    comune: '',
    provincia: '',
    indirizzo: '',
    civico: '',
    sezioneUrbana: '',
    foglio: '',
    particella: '',
    subalterno: '',
    categoriaCatastale: '',
    classeCatastale: '',
    renditaCatastale: 0,
    consistenzaCatastale: 0,
    piano: '',
    documenti: []
  };
  comuni: Comune[] = comuneList;
  provincia: Provincia[] = provinciaList;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  @ViewChild('patrimonioForm') patrimonioForm!: NgForm;
  
  
  constructor(private alertController: AlertController,private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.patrimonioData = data['patrimonioByIdResolver'];
        this.patrimonioData.createDate = this.datePipe.transform(this.patrimonioData.createDate, 'dd/MM/yyyy')!;
        this.patrimonioData.lastUpdateDate = this.datePipe.transform(this.patrimonioData.lastUpdateDate, 'dd/MM/yyyy')!;
        this.patrimonioData.documenti = this.patrimonioData.documenti || [];
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  addDocumento(){
    this.patrimonioData.documenti.push({
      tipoDocumento: '',
      dataDocumento: '',
      percorsoFile: '',
      descrizione: ''
    });
  }

  removeDocumento(index: number){
    this.patrimonioData.documenti.splice(index, 1);
   // this.documenti.splice(index, 1);
  }


  onDataDocumentoChange(selectedDate: any, index: number) {
    if (!selectedDate) return;
    this.patrimonioData.documenti[index].dataDocumento = this.formatToDisplayDate(selectedDate);
  }
  

  async cancelModifiedInputs() {
    const alert = await this.alertController.create({
      header: 'Annulla Modifiche',
      message: 'Vuoi annullare le modifiche per questa sezione?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Sì',
          role: 'confirm',
          handler: () => {
            this.patrimonioForm.reset();
          }
        }
      ],
      cssClass: 'custom-annulla-alert'
    });
  
    await alert.present();
  }

  onSubmit() {  
    console.log(this.patrimonioData);
    

  }

  
  // Convert ISO to dd-mm-yyyy
  formatToDisplayDate(isoDate: string): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

   // Convert dd-mm-yyyy to ISO 
   getISODate(dateStr: string): string {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  }
  
}
