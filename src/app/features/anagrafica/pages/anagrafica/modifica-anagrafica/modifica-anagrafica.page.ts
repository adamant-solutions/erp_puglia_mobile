import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Anagrafica, TipoDocumento } from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import { MessagesService } from 'src/app/core/services/messages.service';


@Component({
  selector: 'app-modifica-anagrafica',
  templateUrl: './modifica-anagrafica.page.html',
  styleUrls: ['./modifica-anagrafica.page.scss'],
})
export class ModificaAnagraficaPage implements OnInit {

  userData!: Anagrafica;
  userForm!: FormGroup;
  errorMsg = '';
  formData: any = {};
  documenti: any//[] = [];
  tipoDocuments = Object.values(TipoDocumento);
  maxDocuments!: number;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild('swiper') swiper!: any/* ElementRef<SwiperContainer> */;
  @ViewChild('anagraficaForm') anagraficaForm!: NgForm;
  currentSlide = 0;

  slides = [
    'cittadino',
    'residenza',
    'contatti',
    'documenti_identita'
  ];

  constructor(
    private datePipe: DatePipe,
    private anagraficaSrv: AnagraficaService,
    private msgService: MessagesService,
    private alertController: AlertController) { }


  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.userData = data['anagraficaByIdResolver']
        this.initializeForm();
        /*   console.log(this.userData) */
      },
      error: (err) => {
        console.log(err)
      }
    });


    if (this.swiper) {
      //parameters
      Object.assign(this.swiper.nativeElement, {
        navigation: false,
        pagination: { type: 'fraction' },
        allowTouchMove: false
      });
      this.swiper.nativeElement.initialize();
    }
    /*  console.log(this.swiper); */

  }


  initializeForm() {
    this.formData = {
      id: this.userData.id,
      createDate: this.datePipe.transform(this.userData.createDate, 'dd/MM/yyyy'),
      lastUpdateDate: this.datePipe.transform(this.userData.lastUpdateDate, 'dd/MM/yyyy'),
      cittadino: {
        id: this.userData.cittadino.id,
        codiceFiscale: this.userData.cittadino.codiceFiscale,
        nome: this.userData.cittadino.nome,
        cognome: this.userData.cittadino.cognome,
        dataDiNascita: this.datePipe.transform(this.userData.cittadino.dataDiNascita, 'yyyy-MM-dd'),
        luogo_nascita: {
          comune: this.userData.cittadino?.luogo_nascita?.comune || '',
          provincia: this.userData.cittadino?.luogo_nascita?.provincia || '',
          stato: this.userData.cittadino?.luogo_nascita?.stato || ''
        },
        genere: this.userData.cittadino.genere,
        cittadinanza: this.userData.cittadino.cittadinanza,
        createDate: this.datePipe.transform(this.userData.cittadino.createDate, 'dd/MM/yyyy'),
        lastUpdateDate: this.datePipe.transform(this.userData.cittadino.lastUpdateDate, 'dd/MM/yyyy'),
        residenza: this.userData.cittadino?.residenza || {},
        contatti: this.userData.cittadino?.contatti || {},
        documenti_identita: this.userData.cittadino?.documenti_identita || []
      }
    };

    this.documenti = this.formData.cittadino.documenti_identita.length > 0 
    ? this.userData.cittadino?.documenti_identita?.map(doc => ({
        ...doc,
        data_emissione: this.formatDateForDisplay(doc.data_emissione),
        data_scadenza: this.formatDateForDisplay(doc.data_scadenza)
      }))
    : [];
  /* 
    console.log(this.documenti) */
  }

  isValidCodiceFiscale(codiceFiscale: string): boolean {
    if (!codiceFiscale) return false;
    
    //[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]
    const codiceFiscaleRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
    
    return codiceFiscaleRegex.test(codiceFiscale);
  }


   // Format date to DD-MM-YYYY
   formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
  

   formatDateForDisplay(date: string | null): string {
    if (!date) return '';
    const dateObj = new Date(date);
   // console.log(this.formatDateToDDMMYYYY(dateObj));
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    //console.log(`${day}-${month}-${year}`)
    return `${day}-${month}-${year}`;
   
  }
           
  onDataEmissioneChange(selectedDate: any, index: number) {
    if (!selectedDate) return;
    const dateObj = new Date(selectedDate);
    this.documenti[index].data_emissione = this.formatDateForDisplay(dateObj.toISOString());
  }

  onDataScadenzaChange(selectedDate: any, index: number) {
    if (!selectedDate) return;
    const dateObj = new Date(selectedDate);
    this.documenti[index].data_scadenza = this.formatDateForDisplay(dateObj.toISOString());
  }


    addDocumentoIdentita() {
      this.maxDocuments = this.tipoDocuments.length;
      if(this.documenti.length < this.maxDocuments){
      this.documenti.push({
        tipo_documento: null,
        numero_documento: null,
        data_emissione: null,
        data_scadenza: null,
        ente_emittente: null
      });
    }
    }

    removeDocumentoIdentita(index: number) {
      this.documenti.splice(index, 1);
    }

    isDocumentTypeDisabled(currentIndex: number, documentType: string): boolean {
      //debugger
      return this.documenti.some((doc:any,index:any) => 
        index !== currentIndex && 
        doc.tipo_documento === documentType
        
      );
    }
    

  nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
       /*   this.swiper.nativeElement.slideNext(); */
      }
  }

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        /* this.swiper.nativeElement.swiper.slidePrev(); */
      }
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
            handler: () => {
              this.resetCurrentSlideData();
            }
          }
        ]
      });
    
      await alert.present();
    }
    
    resetCurrentSlideData() {

        const resetData = (originalObj: any, currentObj: any) => {
          if (!originalObj) return {};
          const resetedObj: any = {};
          
          Object.keys(originalObj).forEach(key => {
            if (typeof originalObj[key] === 'object' && originalObj[key] !== null) {
              resetedObj[key] = resetData(originalObj[key], currentObj[key]);
            } else {
              resetedObj[key] = originalObj[key];
            }
          }); 
          return resetedObj;
        };
      
        switch (this.currentSlide) {
          case 0: // Cittadino 
            this.formData.cittadino = {
              ...resetData(this.userData.cittadino, this.formData.cittadino),
              dataDiNascita: this.datePipe.transform(this.userData.cittadino.dataDiNascita, 'dd/MM/yyyy'),
              createDate: this.datePipe.transform(this.userData.cittadino.createDate, 'dd/MM/yyyy'),
              lastUpdateDate: this.datePipe.transform(this.userData.cittadino.lastUpdateDate, 'dd/MM/yyyy'),
            };
            break;
      
          case 1: // Residenza 
            this.formData.cittadino.residenza = resetData(
              this.userData.cittadino?.residenza || {}, 
              this.formData.cittadino.residenza
            );
            break;
      
          case 2: // Contatti 
            this.formData.cittadino.contatti = resetData(
              this.userData.cittadino?.contatti || {}, 
              this.formData.cittadino.contatti
            );
            break;

            case 3: // Documenti Identita 
            this.documenti = this.userData.cittadino?.documenti_identita
        ? this.userData.cittadino.documenti_identita.map(doc => ({
            ...doc,
            data_emissione: this.formatDateForDisplay(doc.data_emissione),
            data_scadenza: this.formatDateForDisplay(doc.data_scadenza)
          }))
        : [];
      this.formData.cittadino.documenti_identita = [...this.documenti];
        }
      
    }

    onDataDiNascitaChange(data: any) {
       const formattedDate =  this.datePipe.transform(data, 'YYYY-MM-dd');
       this.formData.cittadino.dataDiNascita = formattedDate;
     }

    convertDate(inputDate: string) : any{ 
      if (!inputDate) {
        return;
      }
        try {
          const [day, month, year] = inputDate.split('-').map(Number);
          const dateObj = new Date(year, month - 1, day);
          return dateObj.toISOString();
        } catch (error) {
          return 'Invalid Date Format';
        }
    }
  
     convertDateFormat(dateString: string) {
      const [day, month, year] = dateString.split('/').map(Number);
      const newDate = new Date(year, month - 1, day);
      return newDate.toISOString().split('T')[0];
    }

  onSubmit() {  
    if (this.anagraficaForm.valid) {
   /* 
     console.log("Forma ne fillim: ", this.formData) */
      const sendAnagraficaData = { 
        ...this.formData,
        cittadino: {
          ...this.formData.cittadino,
          dataDiNascita: this.formData.cittadino.dataDiNascita,//this.convertDateFormat(this.formData.cittadino.dataDiNascita),
          documenti_identita: this.documenti.map((doc: { data_emissione: string; data_scadenza: string; }) => ({
            ...doc,
            data_emissione: this.convertDate(doc.data_emissione),//, 'yyyy-MM-ddTHH:mm:ss.SSSZ'),
            data_scadenza: this.convertDate(doc.data_scadenza)//this.datePipe.transform(, 'yyyy-MM-ddTHH:mm:ss.SSSZ')
          })),
          createDate: this.userData.cittadino.createDate,
          lastUpdateDate: this.userData.cittadino.lastUpdateDate
        },
        createDate: this.userData.createDate,
        lastUpdateDate: this.userData.lastUpdateDate
      };
      console.log("SEND ",sendAnagraficaData)

      this.anagraficaSrv.editAnagrafica(sendAnagraficaData).subscribe({
        next: (res) => {
          this.msgService.success("Dati salvati con successo!");
          console.log(res);
        },
        error: (err) => {
          this.handleError(err);
        },
      complete: ()=> {
        this.router.navigate(['/anagrafica/anagrafica-details/',this.formData.id])
      }
      }); 
    } else {
      this.markFormTouched();
    }
  }

  private handleError(err: any) {
    if (err.status === 500) {
      this.errorMsg = "Errore interno del server!";
    } else if (err.status === 400) {
      this.errorMsg =  "Compila tutti i campi obbligatori";
    } else {
      this.errorMsg = "Error!" + err.message;
    }
    this.msgService.error(this.errorMsg);
  }

  private markFormTouched() {
    Object.keys(this.anagraficaForm.controls).forEach(key => {
      const control = this.anagraficaForm.controls[key];
      control.markAsTouched();
    });
  }

}
