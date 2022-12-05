import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// IMPORTANDO EL FORMATO DEL ARRAY SEGUN LA SECCION.
import {IFormatoAlbergue} from 'src/Interfaces/IFormatoAlbergue'


@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {
  
  // LOS PROPS QUE VA A RECIBIR MI MODAL.
  @Input() Datos?: IFormatoAlbergue;

  // INYECCION DEL MODAL-CONTROLLER
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  // FUNCION QUE ME CIERRA EL MODAL.
  closeModal() {
    this.modalController.dismiss();
  }
}
