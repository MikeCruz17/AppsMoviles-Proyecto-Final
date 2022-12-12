import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IReportarSituacion } from 'src/Interfaces/IReportarSituacion';

@Component({
  selector: 'app-reportar-situacion',
  templateUrl: './reportar-situacion.page.html',
  styleUrls: ['./reportar-situacion.page.scss'],
})
export class ReportarSituacionPage implements OnInit {

  constructor(private alertController: AlertController, public http: HttpClient) { }

  public Token?: string;
  public Titulo?: string;
  public Descripcion?: string;
  public Foto?: string;
  public Latitud?: number;
  public Longitud?: number;

  ngOnInit() {
  }

  item?: IReportarSituacion;

  ReportSituation(){
    this.item = {
      token: this.Token!,
      titulo: this.Titulo!,
      descripcion: this.Descripcion!,
      foto: this.Foto!,
      latitud: this.Latitud!,
      longitud: this.Longitud!
    }

    const confimacion =
      this.item.token === null ||
      this.item.token === undefined ||
      this.item.titulo === null ||
      this.item.titulo === undefined ||
      this.item.descripcion === null ||
      this.item.descripcion === undefined ||
      this.item.foto === null ||
      this.item.foto === undefined ||
      this.item.latitud === null ||
      this.item.latitud === undefined ||
      this.item.longitud === null ||
      this.item.longitud === undefined 
      ? false : true;

    if(confimacion){
      // ENVIO DE LOS DATOS A LA API
      console.log(this.item!);
      this.setPost(this.item!);
    }
    // SI FALLA, MOSTRARA UN MODAL.
    else {
      this.presentAlert(false);
    }
  }

  setPost(reportar: IReportarSituacion) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/nueva_situacion.php';
    
    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();


    data.append('token', reportar.token);
    data.append('titulo', reportar.titulo);
    data.append('descripcion', reportar.descripcion);
    data.append('foto', reportar.foto);
    data.append('latitud', reportar.latitud.toString());
    data.append('longitud', reportar.longitud.toString());

    console.log(reportar)

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
        message: 'La situación ha sido reportada.',
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
