import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsModalPageRoutingModule } from './maps-modal-routing.module';

import { MapsModalPage } from './maps-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsModalPageRoutingModule
  ],
  declarations: [MapsModalPage]
})
export class MapsModalPageModule {}
