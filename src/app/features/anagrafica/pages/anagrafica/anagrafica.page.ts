import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {InfiniteScrollCustomEvent} from '@ionic/angular';
import {Anagrafica} from 'src/app/core/models/anagrafica.model';

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

  constructor(private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.currentPage = params['pagina'] ? Number(params['pagina']) : 1;
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
    const searchItem = event.detail.value.toLowerCase();
    
   this.results = this.anagraficaList.filter((d) => d.cittadino.codiceFiscale.toLocaleLowerCase().indexOf(searchItem) > -1);

   /*  console.log(searchTerm) */
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
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
    this.router.navigate(['/anagrafica', { pagina: page }]);
  }

}
