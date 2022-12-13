import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController, private router: Router) {
    this.Confirmacion();
 
  }

  public nombre!: string;
  public correo!: string;

  appPages?: any[];

  Confirmacion() {
    // CONVERTIR LOS DATOS DEL LOCAL-STORAGE EN JSON.
    let item = JSON.parse(localStorage.getItem('Usuario')!);

    // VISTAS QUE VERÁ EL USUARIO
    if (item != null) {
      this.nombre! = item.nombre!;
      this.correo! = item.correo!;

      this.appPages = [
        { title: 'Noticias', url: '/noticias', icon: 'megaphone' },
        {
          title: 'Reportar Situación',
          url: '/reportar-situacion',
          icon: 'duplicate',
        },
        {
          title: 'Mis Situaciones',
          url: '/mis-situaciones',
          icon: 'alert-circle',
        },
        {
          title: 'Mapa de situaciones',
          url: '/mapa-situaciones',
          icon: 'map',
        },
        {
          title: 'Cambiar Contraseña',
          url: '/cambiar-contrasena',
          icon: 'key',
        },
        {
          title: 'Cerrar sesión',
          url: '',
          icon: 'log-out',
        },
      ];
    } else {
      // VISTAS QUE VERÁ UN USUARIO COMÚN
      this.appPages = [
        { title: 'Historia', url: '/historia', icon: 'information-circle' },
        { title: 'Servicios', url: '/servicios', icon: 'people-circle' },
        { title: 'Noticias', url: '/noticias', icon: 'megaphone' },
        { title: 'Videos', url: '/videos', icon: 'videocam' },
        { title: 'Albergues', url: '/albergues', icon: 'business' },
        { title: 'Medidas', url: '/medidas', icon: 'warning' },
        { title: 'Miembros', url: '/miembros', icon: 'people' },
        { title: 'Voluntario', url: '/voluntario', icon: 'person-add' },
        { title: 'Acerca de', url: '/integrantes', icon: 'code-slash' },
        { title: 'LogIn', url: '/login', icon: 'code-slash' },
      ];
    }
  }

  async CerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
         
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {

            // CERRANDO LA SESION.
            localStorage.removeItem('Usuario')!

            // LIMPIANDO LOS CAMPOS.
            this.correo = '';
            this.nombre = '';

            // RETORNANDO A LA VISTA PRINCIPAL
            this.router.navigate(['/']);
          },
        },
      ],
    });

    await alert.present();

  }

  ionViewDidLoad() {
    this.Confirmacion();
  }

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
