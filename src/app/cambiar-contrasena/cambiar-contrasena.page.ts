import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ICambiarContrasena } from 'src/Interfaces/ICambiarContrasena';
import { ObtenerToken } from '../functions/ObtenerToken';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  constructor(private alertController: AlertController, public http: HttpClient) { }

  public Token?: string;
  public ContrasenaAnterior?: string;
  public ContrasenaNueva?: string;

  ngOnInit() {
  }

  item?: ICambiarContrasena;

  ChangePassword(){

    // OBTENER TOKEN.
    this.Token = ObtenerToken();

    this.item = {
      token : this.Token!,
      anterior : this.ContrasenaAnterior!,
      nueva : this.ContrasenaNueva!
    }

    const confimacion =
      this.item.token === null ||
      this.item.token === undefined ||
      this.item.anterior === null ||
      this.item.anterior === undefined ||
      this.item.nueva === null ||
      this.item.nueva === undefined
      ? false : true;

      if (confimacion) {
      
        // ENVIO DE LOS DATOS A LA API
        console.log(this.item!);
        this.setPost(this.item!);
      } 
      
      // SI FALLA, MOSTRARA UN MODAL.
      else {
        this.presentAlert(false);
      }
  }

  setPost(cambiar: ICambiarContrasena) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/cambiar_clave.php';
    
    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();


    data.append('token', cambiar.token);
    data.append('clave_anterior', cambiar.anterior);
    data.append('clave_nueva', cambiar.nueva);

    console.log(cambiar)

    // ENVIANDO EL OBJETO A LA API.
    this.http.post(URL, data).subscribe(
      (voluntario) => {

        // MENSAJE DE CONFIRMACION DE LA API.
        console.log(voluntario);

        // SI TODO FUE CORRECTO, MOSTRARA UN MENSAJE EN PANTALLA.
        this.presentAlert(true);

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

  // ALERTA 
  async presentAlert(conf: boolean) {

    let alert: any;

    if(conf){

      alert = await this.alertController.create({
        header: 'Recibido',
        message: 'La contraseña fue actualizada correctamente.',
        buttons: ['OK'],
      });

    }else{
      alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe llenar todos los campos',
        buttons: ['OK'],
      });
    }
  
}
}