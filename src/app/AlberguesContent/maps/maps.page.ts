import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

// CONTROLADOR PARA ABRIR EL MODAL.
import { ModalController} from '@ionic/angular';

// IMPORTANDO EL ROUTER PARA LAS RUTAS DE LA APP.
import { Router } from '@angular/router';

// IMPORTANDO EL FORMATO DEL ARRAY SEGUN LA SECCION.
import {IFormatoAlbergue} from 'src/Interfaces/IFormatoAlbergue'

// LA PAGINA QUE ABRIRA EL MODAL.
import { MyModalPage } from '../my-modal-albergue/my-modal.page';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  // COMPLEMENTOS PARA CREAR EL MAPA.
  @ViewChild('map')
  mapRef?: ElementRef<HTMLElement> | any;
  newMap?: GoogleMap;

  // CONSTRUCTOR QUE POSEE EL ROUTE Y EL MODAL-CONTROLLER.
  constructor(private route: Router, public modalController: ModalController) {}

    // VARIABLE QUE ALMACENA EL ID DE LA POSICION DEL MARCADOR.
    markerId?: string;

    // ARRAY
    items: IFormatoAlbergue[] = [];

  ngOnInit() {}

  // FUNCION QUE EJECUTA EL METODO LUEGO DE CARGAR LA PAGINA.
  ngAfterViewInit() {
    this.createMap();
  }

    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // FUNCION PARA CREAR EL MAPA.
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,

      // KEY DE LA API EXTRAIDA DESDE EL MODULO DE ENVIRONMENT.
      apiKey: environment.google_maps_api_key,
      config: {

        // LATITUD Y LONGITUD DE LA REP. DOM.
        center: {
          lat: 18.65657,
          lng: -72.3743431,
        },
        zoom: 5.5,
      },
    });

    // EXTRAER DATOS DE LA API.
    await fetch('https://adamix.net/defensa_civil/def/albergues.php')
      .then((response) => response.json())
      .then((data) => {
        // ASIGNANDO LOS DATOS DE LA API A MI ARRAY.
        this.items = data.datos;

        // METODO QUE RECIBE UN ARRAY CON LOS DATOS DE LA API Y AÑADE LOS MARCADORES.
        this.addMarker(this.items);
      });
  }

  // FUNCION PARA CREAR MARCADORES.
  async addMarker(arr: IFormatoAlbergue[]) {

    // CICLO QUE RECORRE TODAS LAS POSICIONES DEL ARRAY PARA CREAR LOS MARCADORES.
    for (let i = 0; i < arr.length; i++) {
      this.markerId = await this.newMap?.addMarker({
        coordinate: {
          lat: parseFloat(arr[i].lng),
          lng: parseFloat(arr[i].lat),
        },
        draggable: true,
      });

    }

    // METODO QUE IDENTIFICA EL CLICK DE LA PANTALLA.
    this.newMap?.setOnMarkerClickListener((event) => {

      //VARIABLE QUE ALMACENA EL ID DEL MARCADOR.
      const number = parseInt(event.markerId)

      // LLAMANDO EL METODO PARA MOSTRAR LOS DATOS SEGUN LA POSICION DEL MARCADOR.
      this.openModal(this.items[number]);

    });
    
  }

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

  // FUNCION QUE ME ABRE LA PAGINA SOLICITADA.
  openAlbergues() {
    this.route.navigate(['/albergues']);
  }
}
