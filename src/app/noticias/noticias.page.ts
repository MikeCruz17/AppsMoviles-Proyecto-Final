import { Component, OnInit } from '@angular/core';

// IMPORTANDO EL FORMATO DEL ARRAY SEGUN LA SECCION.
import {IFormatoNoticias} from 'src/Interfaces/IFormatoNoticias'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})

export class NoticiasPage implements OnInit {
  constructor() {
    this.Obtener();
  }

  ngOnInit() {}

  // ARRAY
  items: IFormatoNoticias[] = [];

    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // METODO PARA OBTENER LOS DATOS DE LA API.
  Obtener = async () => {
    await fetch('https://adamix.net/defensa_civil/def/noticias.php')
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
}
