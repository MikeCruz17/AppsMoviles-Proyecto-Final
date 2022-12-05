import { Component, OnInit } from '@angular/core';
import {IFormatoMiembros} from '../../Interfaces/IFormatoMiembros'

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.page.html',
  styleUrls: ['./miembros.page.scss'],
})
export class MiembrosPage implements OnInit {

  constructor() {
    this.Obtener();
   }

  ngOnInit() {
  }

   // ARRAY
   items: IFormatoMiembros[] = [];

     // ---------------------------------------------------------------------- //
    // ------------------------------ METODOS ------------------------------- //
   // ---------------------------------------------------------------------- //

 // METODO PARA OBTENER LOS DATOS DE LA API.
 Obtener = async () => {
   await fetch('https://adamix.net/defensa_civil/def/miembros.php')
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
