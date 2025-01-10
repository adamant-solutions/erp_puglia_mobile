import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent, ModalController, Platform } from '@ionic/angular';
import { Patrimonio } from 'src/app/core/models/patrimonio.model';
import { SearchAdvancedComponent } from '../../components/search-advanced/search-advanced.component';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.page.html',
  styleUrls: ['./patrimonio.page.scss'],
})
export class PatrimonioPage implements OnInit {

  pageTitle: string = "patrimonio";
  patrimonioList : Patrimonio[] = [];
  currentPage = 0;
  totalPages = 1;
  numElements!: number;
  itemsPerPage = 10;
  searchComuneParam = '';
  searchZonaParam = '';
  searchChips = [
    { name: 'searchComuneParam', value: this.searchComuneParam},
    { name: 'searchZonaParam', value: this.searchZonaParam }
  ]


  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor( private modalController: ModalController,
               private platform: Platform){
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.currentPage = +params['pagina'] || 0;
      this.searchComuneParam = params['comune'] || '';
      this.searchZonaParam = params['zona'] || '';
      this.searchChips = [
        { name: 'searchComuneParam', value: this.searchComuneParam},
        { name: 'searchZonaParam', value: this.searchZonaParam }
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
        const responseData = data['patrimonioResolver']
        this.patrimonioList = responseData.body
        this.numElements = responseData.headers.get('X-Paging-TotalRecordCount');
        this.totalPages = responseData.headers.get('X-Paging-PageCount');
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
         // console.log("in hybrid ts")
    /* 
          if(data['patrimonioResolver'].data === ""){
            this.patrimonioList = []
          } */
       
          this.patrimonioList = responseData.data
         /*  console.log("patrimonioList :", this.patrimonioList); */
          this.numElements = responseData.headers['X-Paging-TotalRecordCount'];
          this.totalPages = responseData.headers['X-Paging-PageCount'];
          /*  console.log(this.totalPages) */
      
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

 
  handleInput(event: any) {
    //const searchItem = event.detail.value;
  
    const searchTerm = event.target.value.toLowerCase();
    this.searchComuneParam = searchTerm;
    const searchParams = { ...this.route.snapshot.params };

    /*  console.log(searchParams) */
    this.router.navigate(['/patrimonio', {
      ...searchParams,
      pagina: 0,
      comune: searchTerm
    }]);

  }


  clearInput(param: any){
    const searchParams = { ...this.route.snapshot.params };

    if(param.name === 'searchComuneParam'){
      this.searchComuneParam = ""
    }
    else if(param.name === 'searchZonaParam'){
      this.searchZonaParam = ""
    }

    this.router.navigate(['/patrimonio', {
      ...searchParams,
      pagina: 0,
      comune: this.searchComuneParam,
      zona: this.searchZonaParam
    }]); 
  }
  

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
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
    this.router.navigate(['/patrimonio', {
      ...currentParams,
      pagina: page
    }]);
  }

  async openAdvancedSearch() {
    const modal = await this.modalController.create({
      component: SearchAdvancedComponent,
      componentProps: {
        comune: this.searchComuneParam,
        zona: this.searchZonaParam,
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const currentParams = { ...this.route.snapshot.params };
        this.router.navigate(['/patrimonio', {
          ...currentParams,
          pagina: 0,
          comune: result.data.comune,
          zona: result.data.zona,
        }]);
      }
    });

    return await modal.present();
  }


}
