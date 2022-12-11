import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IRecuperarContrasena } from 'src/Interfaces/IRecuperarContrasena';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  constructor(private alertController: AlertController, public http: HttpClient) { }

  // DECLARACION DE LAS VARIABLES A UTILIZAR PARA LOS FORMULARIOS.
  public Cedula?: string;
  public Contrasena?: string;

  ngOnInit() {
  }

  // CREACION DE OBJETO TIPO VOLUNTARIO.
  item?: IRecuperarContrasena;

  getPassword() {

    // ASIGNACION DE LOS VALORES AL OBJETO.
    this.item = {
      cedula: this.Cedula!,
      clave: this.Contrasena!
    };

    const confimacion =
      this.item.cedula === null ||
      this.item.cedula === undefined ||
      this.item.clave === null ||
      this.item.clave === undefined
        ? false
        : true;

    // CONFIRMACION PARA ENVIAR TODOS LOS PARAMETROS
    // SOLICITADOS POR LA API.
    if (confimacion) {
      
      // ENVIO DE LOS DATOS A LA API
      this.setPost(this.item!);
      
    } 
    
    // SI FALLA, MOSTRARA UN MODAL.
    else {
      this.presentAlert(false);
    }
  }

  setPost(recuperar: IRecuperarContrasena) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/recuperar_clave.php';
    
    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();


   data.append('cedula', recuperar.cedula);
   data.append('clave', recuperar.clave);
    


    // ENVIANDO EL OBJETO A LA API.
    this.http.post(URL, data).subscribe(
      (recuperar) => {
        
        // MENSAJE DE CONFIRMACION DE LA API.
        console.log(recuperar);

        // SI TODO FUE CORRECTO, MOSTRARA UN MENSAJE EN PANTALLA.
        this.presentAlert(true);


        // Actualizar la pagina.
        setTimeout(() => {

          window.location.reload();
          
        }, 3000);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  // ALERTA 
  async presentAlert(conf: boolean) {

    let alert: any;

    if(conf){

      alert = await this.alertController.create({
        header: 'Recibido',
        message: 'Los datos fueron enviados correctamente.',
        buttons: ['OK'],
      });

    }else{
      alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe llenar todos los campos',
        buttons: ['OK'],
      });
    }
  
    await alert.present();
  }
}

