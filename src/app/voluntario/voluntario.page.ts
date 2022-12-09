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
    this.Nombre;
  }

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

  sendData() {
    console.log(
      this.Nombre,
      this.Apellido,
      this.Cedula,
      this.Contrasena,
      this.ConfContrasena,
      this.Correo,
      this.Telefono
    );

    this.item = {
      id: 0,
      Nombre: this.Nombre!,
      Apellido: this.Apellido!,
      Cedula: this.Cedula!,
      Contrasena: this.Contrasena!,
      Correo: this.Correo!,
      Telefono: this.Telefono!,
    };

    console.log(this.item!);

    // CONFIRMACION
    const confimacion =
      this.item.Apellido === null ||
      this.item.Apellido === undefined ||
      this.item.Cedula === null ||
      this.item.Cedula === undefined ||
      this.item.Contrasena === null ||
      this.item.Contrasena === undefined ||
      this.item.Correo === null ||
      this.item.Correo === undefined ||
      this.item.Nombre === null ||
      this.item.Nombre === undefined ||
      this.item.Telefono === null ||
      this.item.Telefono === undefined
        ? false
        : true;

    if (!confimacion) {
      this.presentAlert();
    }

    this.setPost(this.item!);
  }

  setPost(voluntario: IFormatoVoluntario) {
    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/registro.php';

    let data = new FormData();

    console.log(JSON.stringify(voluntario))

    for (let i in voluntario) {

      data.append(i, JSON.stringify(voluntario));
      
      
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
