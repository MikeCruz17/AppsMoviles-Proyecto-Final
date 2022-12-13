import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaSituacionesPageRoutingModule } from './mapa-situaciones-routing.module';

import { MapaSituacionesPage } from './mapa-situaciones.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaSituacionesPageRoutingModule
  ],
  declarations: [MapaSituacionesPage]
})
export class MapaSituacionesPageModule {}
