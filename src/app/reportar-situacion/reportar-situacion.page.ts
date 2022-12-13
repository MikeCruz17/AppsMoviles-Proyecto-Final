import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { IReportarSituacion } from 'src/Interfaces/IReportarSituacion';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem'
import { ObtenerToken } from '../functions/ObtenerToken';


const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-reportar-situacion',
  templateUrl: './reportar-situacion.page.html',
  styleUrls: ['./reportar-situacion.page.scss'],
})

export class ReportarSituacionPage implements OnInit {

  // CONSTRUCTOR CON LAS VARIANLES CORRESPONDIENTES.
  constructor(private alertController: AlertController, public http: HttpClient, private platform: Platform) {
    this.VerificarUsuario();
  }

  // VARIABLES.
  public Token?: string;
  public Titulo?: string;
  public Descripcion?: string;
  public Foto?: string;
  public Latitud?: number;
  public Longitud?: number;
  item?: IReportarSituacion;

  ngOnInit() {
  }


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
      this.Token = userToken;
      console.log(this.Token)
    }

  }


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // FUNCION PARA SELECCIONAR LA IMAGEN.
  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    })

    console.log(image)

    if (image) {
      this.saveImage(image);
    }
  }


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // OPCION PARA GUARDAR LA IMAGEN UNA VEZ SELECCIONADA.
  async saveImage(photo: Photo) {

    const base64Data = await this.readAsBase64(photo);

    // GUARDANDO EL BASE64 DE LA FOTO.
    this.Foto = base64Data;

    console.log(this.Foto);

    const fileName = new Date().getTime() + 'jpeg';
    const saveFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    })

    console.log('saved: ', saveFile);
  }


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // GUARDAR IMAGEN EN BASE64.
  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });



  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // VALIDACIONES DE CAMPOS NULOS.
  ReportSituation() {

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

    console.log(confimacion)

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


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // ENVIAR DATOS A LA API.
  setPost(reportar: IReportarSituacion) {

    // URL API
    const URL = 'https://adamix.net/defensa_civil/def/nueva_situacion.php';

    // CONSTANTE QUE SIRVE PARA DARLE EL FORMATO DEL OBJETO
    // QUE RECIBIRA LA API.
    let data = new FormData();

    // CONVIRTIENDO LOS CAMPOS EN DATA-FORM Y ASIGNANDO SUS RESPECTIVOS
    // VALORES
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
        setTimeout(() => {

          window.location.reload();

        }, 3000);


      },
      (error) => {

        console.log(error);
      }
    );


  }


  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // ALERTA 
  async presentAlert(conf: boolean) {

    let alert: any;

    if (conf) {

      alert = await this.alertController.create({
        header: 'Recibido',
        message: 'La situación ha sido reportada.',
        buttons: ['OK'],
      });

    } else {
      alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe llenar todos los campos',
        buttons: ['OK'],
      });
    }

    // MOSTRAR LA ALERTA.
    await alert.present();

  }

  // ---------------------------------------------------------------------- //
  // ---------------------------------------------------------------------- //

  // AL MOMENTO DE CARGAR LA PAGINA, SE REALIZARA LA COMPROBACION DEL USUARIO.
  ionViewDidLoad() {
    this.VerificarUsuario();
  }

}
