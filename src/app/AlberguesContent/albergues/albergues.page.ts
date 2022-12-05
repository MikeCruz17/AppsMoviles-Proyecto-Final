import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';

// IMPORTANDO EL ROUTER PARA LAS RUTAS DE LA APP.
import { Router } from '@angular/router';

// IMPORTANDO EL FORMATO DEL ARRAY SEGUN LA SECCION.
import {IFormatoAlbergue} from 'src/Interfaces/IFormatoAlbergue'

// IMPORTANDO LA PAGINA QUE MOSTRARA EL MODAL.
import { MyModalPage } from '../my-modal-albergue/my-modal.page';


@Component({
  selector: 'app-albergues',
  templateUrl: './albergues.page.html',
  styleUrls: ['./albergues.page.scss'],
})

export class AlberguesPage implements OnInit {
  
  // CONSTRUCTOR DONDE SE INYECTA EL MODAL Y EL ROUTE PARA LAS RUTAS.
  constructor(public modalController: ModalController, private route: Router) {
    this.Obtener();
  }

  ngOnInit() {}

  // ARRAY
  items: IFormatoAlbergue[] = [];
  

    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // METODO PARA OBTENER LOS DATOS DE LA API.
  Obtener = async () => {

    await fetch('https://adamix.net/defensa_civil/def/albergues.php')
      .then((response) => response.json())
      .then((data) => {

        // ASIGNANDO LOS DATOS DE LA API A MI ARRAY.
        this.items = data.datos;
        console.log(this.items);
      });

  };

  // ABRIR MODAL PARA MOSTRAR MAS INFORMACION SOBRE LOS ALBERGUES.
  async openModal(item: IFormatoAlbergue) {

    const modal = await this.modalController.create({
      component: MyModalPage,
      cssClass: 'my-custom-class',

      // ASIGNANDO LOS PROPS QUE SERÁN TRANSFERIDOS AL MODAL.
      componentProps: {
        Datos: item,
      },
    });
    return await modal.present();
    
  }

  // FUNCION QUE EJECUTA EL METODO AL CARGAR LA PAGINA.
  ionViewDidLoad() {
    this.Obtener();
  }

  // FUNCION QUE ME ABRE LA PAGINA SOLICITADA.
  openMaps() {
    this.route.navigate(['/maps']);
  }
}
