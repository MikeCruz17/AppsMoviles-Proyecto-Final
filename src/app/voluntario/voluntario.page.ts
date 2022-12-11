import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IFormatoVoluntario } from 'src/Interfaces/IFormatoVoluntario';

// LIBRERIA PARA ENVIAR LOS DATOS A LA API.
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.page.html',
  styleUrls: ['./voluntario.page.scss'],
})

export class VoluntarioPage implements OnInit {

  constructor(private alertController: AlertController, public http: HttpClient) {
    this.validationPassword();
  }

  // DECLARACION DE LAS VARIABLES A UTILIZAR PARA LOS FORMULARIOS.
  public Nombre?: string;
  public Apellido?: string;
  public Cedula?: string;
  public Contrasena?: string;
  public ConfContrasena?: string;
  public Correo?: string;
  public Telefono?: string;

  ngOnInit() {}

  // CREACION DE OBJETO TIPO VOLUNTARIO.
  item?: IFormatoVoluntario;

  
    // ---------------------------------------------------------------------- //
   // ------------------------------ METODOS ------------------------------- //
  // ---------------------------------------------------------------------- //

  sendData() {

    // ASIGNACION DE LOS VALORES AL OBJETO.
    this.item = {
      id: 0,
      nombre: this.Nombre!,
      apellido: this.Apellido!,
      cedula: this.Cedula!,
      clave: this.Contrasena!,
      correo: this.Correo!,
      telefono: this.Telefono!,
    };

    // CONFIRMACION
    const confimacion =
      this.item?.apellido === null ||
      this.item?.apellido === undefined ||
      this.item.cedula === null ||
      this.item.cedula === undefined ||
      this.item.clave === null ||
      this.item.clave === undefined ||
      this.item.correo === null ||
      this.item.correo === undefined ||
      this.item.nombre === null ||
      this.item.nombre === undefined ||
      this.item.telefono === null ||
      this.item.telefono === undefined ||
      this.validationPassword() === false
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

  // VALIDACION DE CONTRASEÑA
  validationPassword() {
    if (this.Contrasena === this.ConfContrasena) {
      return true;
    } else {
      return false;
    }
  }

  // ENVIAR DATOS A LA API.
  setPost(voluntario: IFormatoVoluntario) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/registro.php';
    
    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();


   data.append('cedula', voluntario.cedula);
   data.append('nombre', voluntario.nombre);
   data.append('apellido', voluntario.apellido);
   data.append('correo', voluntario.correo);
   data.append('clave', voluntario.clave);
   data.append('telefono', voluntario.telefono);
    


    // ENVIANDO EL OBJETO A LA API.
    this.http.post(URL, data).subscribe(
      (voluntario) => {
        
        // MENSAJE DE CONFIRMACION DE LA API.
        console.log(voluntario);

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
