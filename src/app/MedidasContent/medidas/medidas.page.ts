import { Component, OnInit } from '@angular/core';
import { IFormatoMedidas } from '../../../Interfaces/IFormatoMedidas';
import { ModalController} from '@ionic/angular';

// PAGINA QUE ABRIRA EL MODAL.
import {ModalMedidasPage} from '../modal-medidas/modal-medidas.page';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.page.html',
  styleUrls: ['./medidas.page.scss'],
})
export class MedidasPage implements OnInit {

  constructor(public modalController: ModalController) { 
    this.Obtener();
  }

  ngOnInit() {
  }

  // ARRAY
  items: IFormatoMedidas[] = [];
  

    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // METODO PARA OBTENER LOS DATOS DE LA API.
  Obtener = async () => {
    await fetch('https://adamix.net/defensa_civil/def/medidas_preventivas.php')
      .then((response) => response.json())
      .then((data) => {
        // ASIGNANDO LOS DATOS DE LA API A MI ARRAY.
        this.items = data.datos;
        console.log(this.items);
      });
  };

  // FUNCION QUE EJECUTA EL METODO AL CARGAR LA PAGINA.
  ionViewDidLoad() {
    this.Obtener();
  }

  // ABRIR MODAL PARA MOSTRAR MAS INFORMACION SOBRE LOS ALBERGUES.
  async openModal(item : IFormatoMedidas) {

    const modal = await this.modalController.create({
      component: ModalMedidasPage,
      cssClass: 'my-custom-class',


      // ASIGNANDO LOS PROPS QUE SERÁN TRANSFERIDOS AL MODAL.
      componentProps: {
        Datos: item,
      },

    });
    
    return await modal.present();
    
  }

}
