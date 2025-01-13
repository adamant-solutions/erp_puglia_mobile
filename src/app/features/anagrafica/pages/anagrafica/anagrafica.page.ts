import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform} from '@ionic/angular';
import {Anagrafica} from 'src/app/core/models/anagrafica.model';
import { AnagraficaSearchParams } from 'src/app/core/resolvers/anagrafica.resolver';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';


@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.page.html',
  styleUrls: ['./anagrafica.page.scss'],
})
export class AnagraficaPage implements OnInit {
  pageTitle: string = "anagrafica";

  anagraficaList: Anagrafica[] = [];
  currentPage = 0;
  totalPages = 1;
  numElements!: number;
  searchCFParam = '';
  searchNomeParam = '';
  searchCognomeParam = '';
  searchChips = [
    { name: 'searchCFParam', value: this.searchCFParam },
    { name: 'searchNomeParam', value: this.searchNomeParam },
    { name: 'searchCognomeParam', value: this.searchCognomeParam }
  ]

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor( private modalController: ModalController,
               private platform: Platform){
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.searchCFParam = params['codiceFiscale'] || '';
      this.searchNomeParam = params['nome'] || '';
      this.searchCognomeParam = params['cognome'] || '';
      this.searchChips = [
        { name: 'searchCFParam', value: this.searchCFParam },
        { name: 'searchNomeParam', value: this.searchNomeParam },
        { name: 'searchCognomeParam', value: this.searchCognomeParam }
      ]
  
      if (this.platform.is('hybrid')) {
        this.getListInNative();
      }
      else{
        this.getList();
      }
     
    });
  }

  getList(){
    this.route.data.subscribe({
      next: (data) => {
        const responseData = data['anagraficaResolver']
        this.anagraficaList = responseData.body
        this.numElements = responseData.headers.get('X-Paging-TotalRecordCount');
        this.totalPages = responseData.headers.get('X-Paging-PageCount') 
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getListInNative() { 
    this.route.data.subscribe({
      next: (data) => {
        if(data['anagraficaResolver'] === ""){
          this.anagraficaList = []
        }
       const responseData = data['anagraficaResolver']
        this.anagraficaList = responseData.data
       /*  console.log("Anagrafica list:", this.anagraficaList); */
        this.numElements = responseData.headers['X-Paging-TotalRecordCount'];
        this.totalPages = responseData.headers['X-Paging-PageCount'];
        /*  console.log(this.totalPages) */
     
      },
      error: (err) => {
        console.log("Error:" ,err)
      }
    });
  }

   handleInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchCFParam = searchTerm;
    const searchParams = { ...this.route.snapshot.params };
    
    this.router.navigate(['/anagrafica', {
      ...searchParams,
      pagina: 0,
      codiceFiscale: searchTerm
    }]);
  /*   
    console.log("Handle input: ", searchTerm)
    console.log("search object" , searchParams ) */
  }

  async openAdvancedSearch() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        codiceFiscale: this.searchCFParam,
        nome: this.searchNomeParam,
        cognome: this.searchCognomeParam
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const currentParams = { ...this.route.snapshot.params };
        this.router.navigate(['/anagrafica', {
          ...currentParams,
          pagina: 0,
          codiceFiscale: result.data.codiceFiscale,
          nome: result.data.nome,
          cognome: result.data.cognome
        }]);
      }
    });

    return await modal.present();
  }

  clearInput(param: any){
    const searchParams = { ...this.route.snapshot.params };

    if(param.name === 'searchCFParam'){
      this.searchCFParam = ""
    }
    else if(param.name === 'searchNomeParam'){
      this.searchNomeParam = ""
    }
    else {
      this.searchCognomeParam = ""
    }

    this.router.navigate(['/anagrafica', {
      ...searchParams,
      pagina: 0,
      codiceFiscale: this.searchCFParam,
      nome: this.searchNomeParam,
      cognome: this.searchCognomeParam
    }]); 
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
     this.navigateToPage(this.currentPage + 1);  
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.navigateToPage(this.currentPage - 1);
    }
  }

  private navigateToPage(page: number) {
    const currentParams = { ...this.route.snapshot.params };
    this.router.navigate(['/anagrafica', {
      ...currentParams,
      pagina: page
    }]);
  }
}
