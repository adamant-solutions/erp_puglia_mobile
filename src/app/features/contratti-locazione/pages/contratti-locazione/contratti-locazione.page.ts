import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Contratti } from 'src/app/core/models/contratti.model';
import { SearchContrattiComponent } from '../../components/search-contratti/search-contratti.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contratti-locazione',
  templateUrl: './contratti-locazione.page.html',
  styleUrls: ['./contratti-locazione.page.scss'],
})
export class ContrattiLocazionePage implements OnInit {
  pageTitle = "Contratti Locazione";
  contrattiList: Contratti[] = [];
  currentPage = 0;
  totalPages = 1;
  numElements!: number;
  searchIndirizzoParam = '';
  searchCanoneMensileMinParam = '';
  searchCanoneMensileMaxParam = '';
  searchDataInizioFromParam = '';
  searchDataInizioToParam = '';
  searchDataFineToParam = '';

  searchChips = [
    { name: 'indirizzoParam', value: this.searchIndirizzoParam},
    { name: 'canoneMensileMinParam', value: this.searchCanoneMensileMinParam },
    { name: 'canoneMensileMaxParam', value: this.searchCanoneMensileMaxParam},
    { name: 'dataInizioFromParam', value: this.searchDataInizioFromParam },
    { name: 'dataInizioToParam', value: this.searchDataInizioToParam},
    { name: 'dataFineToParam', value: this.searchDataFineToParam },
  ]
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private subscriptions: Subscription[] = [];


  constructor(private modalController: ModalController,
    private platform: Platform) {
  }

  ngOnInit() {

    const paramsSub = this.route.params.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
        this.searchIndirizzoParam = params['indirizzo'] || '';
        this.searchCanoneMensileMinParam = params['canoneMensileMin'] || '';
        this.searchCanoneMensileMaxParam = params['canoneMensileMax'] || '';
        this.searchDataInizioFromParam = params['dataInizioFrom'] || '';
        this.searchDataInizioToParam = params['dataInizioTo'] || '';
        this.searchDataFineToParam = params['dataFineTo'] || '';

        this.searchChips = [
          { name: 'indirizzoParam', value: this.searchIndirizzoParam},
          { name: 'canoneMensileMinParam', value: this.searchCanoneMensileMinParam },
          { name: 'canoneMensileMaxParam', value: this.searchCanoneMensileMaxParam},
          { name: 'dataInizioFromParam', value: this.searchDataInizioFromParam },
          { name: 'dataInizioToParam', value: this.searchDataInizioToParam},
          { name: 'dataFineToParam', value: this.searchDataFineToParam },
        ]
  
      if (this.platform.is('hybrid')) {
        this.getListInNative();
      }
      else{
        this.getList();
      }
     
     // console.log(this.contrattiList)
    });
    this.subscriptions.push(paramsSub);
  }

  getList(){
    const dataSub = this.route.data.subscribe({
      next: (data) => {
        const responseData = data['contrattiResolver']
        this.contrattiList = responseData.body
        this.numElements = responseData.headers.get('X-Paging-TotalRecordCount');
        this.totalPages = responseData.headers.get('X-Paging-PageCount');
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.subscriptions.push(dataSub);
  }


  getListInNative() { 
    const dataSub = this.route.data.subscribe({
      next: (data) => {
        const responseData = data['contrattiResolver']
        if(this.platform.is('hybrid')){
          this.contrattiList = responseData.data
          this.numElements = responseData.headers['X-Paging-TotalRecordCount'];
          this.totalPages = responseData.headers['X-Paging-PageCount'];
        }
        else {
          this.contrattiList = responseData
        }
      },
      error: (err) => {
        console.log("Error: ",err)
      }
    });
    this.subscriptions.push(dataSub);
  }

  handleInput(event: any){
    const searchTerm = event.target.value.toLowerCase();
    this.searchCanoneMensileMinParam = searchTerm;
    const searchParams = { ...this.route.snapshot.params };
    
    this.router.navigate(['/contratti-locazione', {
      ...searchParams,
      pagina: 0,
      canoneMensileMin: searchTerm
    }]);
  }


  async openAdvancedSearch() {
    const modal = await this.modalController.create({
      component: SearchContrattiComponent, 
      componentProps: {
        indirizzo: this.searchIndirizzoParam,
        canoneMensileMin: this.searchCanoneMensileMinParam,
        canoneMensileMax: this.searchCanoneMensileMaxParam,
        dataInizioFrom: this.searchDataInizioFromParam,
        dataInizioTo: this.searchDataInizioToParam,
        dataFineTo: this.searchDataFineToParam,
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const currentParams = { ...this.route.snapshot.params };
        this.router.navigate(['/contratti-locazione', {
          ...currentParams,
          pagina: 0,
          indirizzo: result.data.indirizzo,
          canoneMensileMin: result.data.canoneMensileMin,
          canoneMensileMax: result.data.canoneMensileMax,
          dataInizioFrom: result.data.dataInizioFrom,
          dataInizioTo: result.data.dataInizioTo,
          dataFineTo: result.data.dataFineTo,
        }]);
      }
    });

    return await modal.present();
  }


  clearInput(param: any){

    const searchParams = { ...this.route.snapshot.params };

    if (param.name === 'indirizzoParam') {
      this.searchIndirizzoParam = ""
    }
    else if (param.name === 'canoneMensileMinParam') {
      this.searchCanoneMensileMinParam = ""
    }
    else if (param.name === 'canoneMensileMaxParam') {
      this.searchCanoneMensileMaxParam = ""
    }
    else if (param.name === 'dataInizioFromParam') {
      this.searchDataInizioFromParam = ""
    }
    else if (param.name === 'dataInizioToParam') {
      this.searchDataInizioToParam = ""
    }
    else if (param.name === 'dataFineToParam') {
      this.searchDataFineToParam = ""
    }


    this.router.navigate(['/contratti-locazione', {
      ...searchParams,
      pagina: 0,
      indirizzo: this.searchIndirizzoParam,
      canoneMensileMin: this.searchCanoneMensileMinParam,
      canoneMensileMax: this.searchCanoneMensileMaxParam,
      dataInizioFrom: this.searchDataInizioFromParam,
      dataInizioTo: this.searchDataInizioToParam,
      dataFineTo: this.searchDataFineToParam,
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
    this.router.navigate(['/contratti-locazione', {
      ...currentParams,
      pagina: page
    }]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
