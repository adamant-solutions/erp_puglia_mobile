import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anagrafica } from 'src/app/core/models/anagrafica.model';

@Component({
  selector: 'app-anagrafica-details',
  templateUrl: './anagrafica-details.page.html',
  styleUrls: ['./anagrafica-details.page.scss'],
})
export class AnagraficaDetailsPage implements OnInit {

  userData!: Anagrafica;

  breadCrumbs = [{ name: 'Anagrafica', url: '/anagrafica' }, { name: 'Anagrafica Dettagli', url: [] }]
  userForm!: FormGroup;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.userData = data['anagraficaByIdResolver']
      },
      error: (err) => {
        console.log(err)
      }
    });
    console.log(this.userData);

  }

}
