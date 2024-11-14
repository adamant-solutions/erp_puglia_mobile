import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [IonicModule],
  styleUrls: ['./footer.component.scss'],
  standalone: true,
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
