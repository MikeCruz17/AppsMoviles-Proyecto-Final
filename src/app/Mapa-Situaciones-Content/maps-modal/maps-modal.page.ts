import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ISituaciones } from 'src/Interfaces/ISituaciones';

@Component({
  selector: 'app-maps-modal',
  templateUrl: './maps-modal.page.html',
  styleUrls: ['./maps-modal.page.scss'],
})
export class MapsModalPage implements OnInit {
 
 @Input() Datos?: ISituaciones;

 
  // LOS PROPS QUE VA A RECIBIR MI MODAL.
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

   // FUNCION QUE ME CIERRA EL MODAL.
   closeModal() {
    this.modalController.dismiss();
  }

}
