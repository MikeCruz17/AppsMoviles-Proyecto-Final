import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IFormatoLogin } from 'src/Interfaces/IFormatoLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, public http: HttpClient, private router: Router) {

  }

  public Cedula?: string;
  public Clave?: string;

  ngOnInit() {
  }

  item?: IFormatoLogin;

   LogIn(){
    this.item = {
      cedula : this.Cedula!,
      clave : this.Clave!,
     
    }

    // CONFIRMACION
    const confimacion =
      this.item.cedula === null ||
      this.item.cedula === undefined ||
      this.item.clave === null ||
      this.item.clave === undefined ? false : true;
     
    
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


   setPost(login: IFormatoLogin) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/iniciar_sesion.php';
    
    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();


    data.append('cedula', login.cedula);
    data.append('clave', login.clave);

    console.log(login)

    // ENVIANDO EL OBJETO A LA API.
    this.http.post(URL, data).subscribe(
      (voluntario: any) => {
   
        // ALMACENANDO LOS DATOS DEL USUARIO QUE RETORNA EL LOGIN
        // Y SE CONVIERTE A STRING PARA ALMACENARLOS EN EL LOCAL-STORAGE.
        const datos = JSON.stringify(Object(voluntario)["datos"]);

      if(voluntario.exito != false){

        // INSERTAT DATOS AL LOCAL-STORAGE.
        localStorage.setItem('Usuario', datos);
        this.router.navigate(['/bienvenido']);
      }else{
        this.presentAlert(false, 3);
      }

      },
      (error) => {
      
       this.presentAlert(false, 3)
      }
    );
  }

  // ALERTA 
  async presentAlert(conf: boolean, caso?: number) {

    let alert: any;

    if(conf){

      alert = await this.alertController.create({
        header: 'Recibido',
        message: 'Los datos fueron enviados correctamente.',
        buttons: ['OK'],
      });

    }
    
    if(caso === 3){

      alert = await this.alertController.create({
        header: 'Error',
        message: 'Cedula o Clave incorrectas.',
        buttons: ['OK'],
      });
    }

    else{
      alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe llenar todos los campos',
        buttons: ['OK'],
      });
    }
  
    await alert.present();
  }

}
