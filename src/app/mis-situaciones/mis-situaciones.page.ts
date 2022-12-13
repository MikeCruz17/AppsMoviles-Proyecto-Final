import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ObtenerToken } from 'src/app/functions/ObtenerToken';
import { ISituaciones } from 'src/Interfaces/ISituaciones';

@Component({
  selector: 'app-mis-situaciones',
  templateUrl: './mis-situaciones.page.html',
  styleUrls: ['./mis-situaciones.page.scss'],
})
export class MisSituacionesPage implements OnInit {

  constructor(public http: HttpClient) {
    this.VerificarUsuario();
   }

  ngOnInit() {
  }

  // ARRAY QUE CONTIENE TODAS LAS SITUACIONES DE X USUARIO. 
  items: ISituaciones [] = [];


    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  // FUNCION QUE VERIFICA SI EXISTE UNA SESION DE ALGUN USUARIO PARA LUEGO
  // EXTRAER EL TOKEN.
  VerificarUsuario() {

    // OBTENER EL TOKEN DEL USUARIO.
    const userToken = ObtenerToken();

    // SI EL USUARIO NO ES NULO, SE ALMACENARA EL TOKEN EN UNA VARIABLE.
    if (userToken != null) {
      
      console.log(userToken);

      // ENVIAR EL TOKEN AL METODO PARA OBTENER LAS SITUACIONES.
      this.setPost(userToken);

    }

  }


  
  setPost(token: string) {

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
       this.items=[...this.items, ...situaciones["datos"]];

       
       console.log(this.items[0])

        
        // SI TODO FUE CORRECTO, MOSTRARA UN MENSAJE EN PANTALLA.
        // this.presentAlert(true);


        // Actualizar la pagina.
      /*  setTimeout(() => {

          window.location.reload();
          
        }, 3000);
        */
      },
      (error) => {
      
        console.log(error);
      }
    );
  }

  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // AL MOMENTO DE CARGAR LA PAGINA, SE REALIZARA LA COMPROBACION DEL USUARIO.
  ionViewDidLoad() {
    
    this.VerificarUsuario();
   
  }

}
