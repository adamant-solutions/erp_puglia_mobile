import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController} from '@ionic/angular';
import {Anagrafica} from 'src/app/core/models/anagrafica.model';
import { AnagraficaSearchParams } from 'src/app/core/resolvers/anagrafica.resolver';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';


@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.page.html',
  styleUrls: ['./anagrafica.page.scss'],
})
export class AnagraficaPage implements OnInit {
  pageTitle: string = "anagrafica";

  anagraficaList: Anagrafica[] = [];
  results: Anagrafica [] = [];
  currentPage = 1;
  hasMorePages = true;
  itemsPerPage = 10;
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
               private anagrafSrc: AnagraficaService){
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentPage = +params['pagina'] || 1;
      this.searchCFParam = params['codiceFiscale'] || '';
      this.searchNomeParam = params['nome'] || '';
      this.searchCognomeParam = params['cognome'] || '';
      this.searchChips = [
        { name: 'searchCFParam', value: this.searchCFParam },
        { name: 'searchNomeParam', value: this.searchNomeParam },
        { name: 'searchCognomeParam', value: this.searchCognomeParam }
      ]
      this.getList();
    });
  }

  getList() {
    this.route.data.subscribe({
      next: (data) => {
        this.anagraficaList = data['anagraficaResolver']
        this.results = [...this.anagraficaList]
        this.hasMorePages = this.anagraficaList.length === this.itemsPerPage;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

   handleInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchCFParam = searchTerm;
    const searchParams = { ...this.route.snapshot.params };
    
    this.router.navigate(['/anagrafica', {
      ...searchParams,
      pagina: 1,
      codiceFiscale: searchTerm
    }]);
  /*   
    console.log("Handle input: ", searchTerm)
    console.log("search object" , searchParams ) */
  }

  search(searchParams: AnagraficaSearchParams) {
    this.anagrafSrc.getAnagraficaList(searchParams)?.subscribe({
      next: (results) => {
        /* console.log("Brenda search :" , results) */
          this.results = [...results];
      },
      error: (err) => {
        this.results = [];
      }
    })
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
          pagina: 1,
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
      pagina: 1,
      codiceFiscale: this.searchCFParam,
      nome: this.searchNomeParam,
      cognome: this.searchCognomeParam
    }]); 
  }
  
  nextPage() {
    if (this.hasMorePages) {
     this.navigateToPage(this.currentPage + 1);  
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
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
