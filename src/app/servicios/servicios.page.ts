import { Component, OnInit } from '@angular/core';

// IMPORTANDO EL FORMATO DEL ARRAY SEGUN LA SECCION.
import {IFormatoServicios} from 'src/Interfaces/IFormatoServicios'

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})

export class ServiciosPage implements OnInit {

  constructor() { 
    this.Obtener()
  }
  

  ngOnInit() {
  }
  

  // ARRAY
  items: IFormatoServicios[] = [];
  
  
    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // METODO PARA OBTENER LOS DATOS DE LA API.
  Obtener = async() => {

    await fetch('https://adamix.net/defensa_civil/def/servicios.php')
    .then((response) => response.json())
     .then((data) => {

      // ASIGNANDO LOS DATOS DE LA API A MI ARRAY.
      this.items = data.datos;
      console.log(this.items)
     });

    
  }

  // FUNCION QUE EJECUTA EL METODO AL CARGAR LA PAGINA.
  ionViewDidLoad() {
    this.Obtener()
  }

  

}
