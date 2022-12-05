import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IFormatoMedidas } from '../../../Interfaces/IFormatoMedidas';

@Component({
  selector: 'app-modal-medidas',
  templateUrl: './modal-medidas.page.html',
  styleUrls: ['./modal-medidas.page.scss'],
})
export class ModalMedidasPage implements OnInit {

  // LOS PROPS QUE VA A RECIBIR MI MODAL.
  @Input() Datos?: IFormatoMedidas;

  // INYECTANDO EL CONTROLADOR MODAL-CONTROLLER.
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  // FUNCION QUE ME CIERRA EL MODAL.
  closeModal() {
    this.modalController.dismiss();
  }
  
}
