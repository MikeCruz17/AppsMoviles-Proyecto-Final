import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsModalPage } from './maps-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MapsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsModalPageRoutingModule {}
