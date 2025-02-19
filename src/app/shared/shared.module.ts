import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { IonicModule } from '@ionic/angular';

/*
└── shared/                       # Shared modules/components/pipes (used across modules)
    ├── components/               # Shared components
    ├── directives/               # Shared directives
    ├── pipes/                    # Shared pipes
    ├── services/                 # Shared services
    └── shared.module.ts          # Import all shared resources */

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],exports:[
    LoaderComponent
  ]
})
export class SharedModule {
}
