import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IFormatoVoluntario } from 'src/Interfaces/IFormatoVoluntario';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.page.html',
  styleUrls: ['./voluntario.page.scss'],
})
export class VoluntarioPage implements OnInit {

  
  constructor(private alertController: AlertController) { 
    this.Nombre
  }

  public Nombre?: string;


  ngOnInit() {

  }

  // CREACION DE OBJETO TIPO VOLUNTARIO.
  item?: IFormatoVoluntario;

  sendData(){

    console.log(this.Nombre);

    const confimacion = this.item === undefined || this.item.Apellido === null 
                        || this.item.Cedula === null || this.item.Contrasena === null 
                        || this.item.Correo === null || this.item.Nombre === null 
                        || this.item.Telefono === null ? false : true;

    if(!confimacion){
      this.presentAlert();
    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      // subHeader: 'Important message',
      message: 'Debe llenar todos los campos',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
