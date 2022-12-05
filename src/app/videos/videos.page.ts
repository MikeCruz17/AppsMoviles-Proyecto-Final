import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// IMPORTANDO EL FORMATO DEL ARRAY SEGUN LA SECCION.
import {IFormatoVideo} from 'src/Interfaces/IFormatoVideo'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})

export class VideosPage implements OnInit {
  
  // AÑADIENDO EL SANITIZER PARA LA URL DEL VIDEO.
  constructor(private sanitizer: DomSanitizer) {
    this.Obtener();
  }

  ngOnInit() {}

  // ARRAY
  items: IFormatoVideo[] = [];

    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // METODO PARA OBTENER LOS DATOS DE LA API.
  Obtener = async () => {

    await fetch('https://adamix.net/defensa_civil/def/videos.php')
      .then((response) => response.json())
      .then((data) => {

        // ARRAY QUE ALMACENARA LOS DATOS DE MANERA PROVISIONAL.
        const Arr = [];

        // ASIGNANDO LOS DATOS DE LA API A MI ARRAY.
        const { datos } = data;

        // CICLO QUE RECORRE TODAS LAS POSICIONES DEL ARRAY PARA REALIZAR
        // LAS OPERACIONES SIGUIENTES...
        for (let i = 0; i < datos.length; i++) {
         
          // VARIABLE QUE ALMACENA LOS DATOS SEGUN LA POSICION PARA LUEGO
          // SER INSERTADO EN EL ARRAY.
          const obj = {
            descripcion: datos[i].descripcion,
            fecha: datos[i].fecha,
            id: datos[i].id,

            // CONVERSION DE LINK EN YOUTUBE PARA EL CORS.
            link: this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube-nocookie.com/embed/${datos[i].link}`
            ),
            titulo: datos[i].titulo,
          };

          // INSERTANDO LOS DATOS EN EL ARRAY.
          Arr.push(obj);
        }

        // ASIGNACION DE DATOS AL ARRAY.
        this.items = Arr;

      });
  };

  // FUNCION QUE EJECUTA EL METODO AL CARGAR LA PAGINA.
  ionViewDidLoad() {
    this.Obtener();
  }
}
