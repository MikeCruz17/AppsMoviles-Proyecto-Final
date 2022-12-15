import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ISituaciones } from 'src/Interfaces/ISituaciones';
import { ObtenerToken } from '../../functions/ObtenerToken';



// CONTROLADOR PARA ABRIR EL MODAL.
import { ModalController} from '@ionic/angular';
import { MapsModalPage } from '../maps-modal/maps-modal.page';

@Component({
  selector: 'app-mapa-situaciones',
  templateUrl: './mapa-situaciones.page.html',
  styleUrls: ['./mapa-situaciones.page.scss'],
})

export class MapaSituacionesPage implements OnInit {

    // COMPLEMENTOS PARA CREAR EL MAPA.
    @ViewChild('map')
    mapRef?: ElementRef<HTMLElement> | any;
    newMap?: GoogleMap;
  

  constructor(private http: HttpClient, public modalController: ModalController) {
    this.VerificarUsuario()
   }

  ngOnInit() {
  }

  // VARIABLES
  items: ISituaciones[] = [];

    // VARIABLE QUE ALMACENA EL ID DE LA POSICION DEL MARCADOR.
    markerId?: string;


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

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
      apiKey: 'AIzaSyCXkEpJbqsIo8S9Hs3fPjA4MJUYIFrO7Ew',
      config: {

        // LATITUD Y LONGITUD DE LA REP. DOM.
        center: {
          lat: 18.65657,
          lng: -72.3743431,
        },
        zoom: 5.5,
      },
    });

    this.VerificarUsuario();

  }


   // FUNCION QUE VERIFICA SI EXISTE UNA SESION DE ALGUN USUARIO PARA LUEGO
  // EXTRAER EL TOKEN.
  VerificarUsuario() {

    // OBTENER EL TOKEN DEL USUARIO.
    const userToken = ObtenerToken();

    // SI EL USUARIO NO ES NULO, SE ALMACENARA EL TOKEN EN UNA VARIABLE.
    if (userToken != null) {
      
      // ENVIAR EL TOKEN AL METODO PARA OBTENER LAS SITUACIONES.
      this.setPost(userToken);

    }

  }

  
  async setPost(token: string) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/situaciones.php';
    
    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();

    // CONVIRTIENDO EL CAMPO TOKEN EN FORM-DATA Y ASIGNANDO EL VALOR.
    data.append('token', token);

    // ENVIANDO EL OBJETO A LA API.
    this.http.post(URL, data).subscribe(
      (situaciones: any) => {

        // INSERTANDO SITUACIONES AL ARRAY.
       this.items= situaciones.datos;

        this.addMarker(this.items);

      },
      (error) => {
      
        console.log(error);
      }
    );
  }

    // FUNCION PARA CREAR MARCADORES.
    async addMarker(arr: ISituaciones[]) {

    

      // CICLO QUE RECORRE TODAS LAS POSICIONES DEL ARRAY PARA CREAR LOS MARCADORES.
      for (let i = 0; i < arr.length; i++) {
        this.markerId = await this.newMap?.addMarker({
          coordinate: {
            lat: parseFloat(arr[i].latitud),
            lng: parseFloat(arr[i].longitud),
          },
          draggable: false,
        });
  
      }
      

      // METODO QUE IDENTIFICA EL CLICK DE LA PANTALLA.
      this.newMap?.setOnMarkerClickListener((event) => {
  
        //VARIABLE QUE ALMACENA EL ID DEL MARCADOR.
        const number = parseInt(event.markerId);
  
        // LLAMANDO EL METODO PARA MOSTRAR LOS DATOS SEGUN LA POSICION DEL MARCADOR.
        this.openModal(this.items[number]);
  
      });
      
    }

    // ABRIR MODAL PARA MOSTRAR MAS INFORMACION SOBRE LOS ALBERGUES.
  async openModal(item: ISituaciones) {

    const modal = await this.modalController.create({
      component: MapsModalPage,
      cssClass: 'my-custom-class',

      // ASIGNANDO LOS PROPS QUE SERÁN TRANSFERIDOS AL MODAL.
      componentProps: {
        Datos: item,
      },
    });
    return await modal.present();
    
  }
  
  
 
}
