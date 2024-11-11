import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* 
└── shared/                       # Shared modules/components/pipes (used across modules)
    ├── components/               # Shared components 
    ├── directives/               # Shared directives
    ├── pipes/                    # Shared pipes
    ├── services/                 # Shared services
    └── shared.module.ts          # Import all shared resources */

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
