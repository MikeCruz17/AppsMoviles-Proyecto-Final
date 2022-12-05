import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoluntarioPageRoutingModule } from './voluntario-routing.module';

import { VoluntarioPage } from './voluntario.page';
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntarioPageRoutingModule,
    IonicInputMaskModule
  ],

  
  declarations: [VoluntarioPage]
})
export class VoluntarioPageModule {}
