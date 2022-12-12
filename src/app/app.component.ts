import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // CONVERTIR LOS DATOS DEL LOCAL-STORAGE EN JSON.
  item = JSON.parse(localStorage.getItem('Usuario')!);

  // UNA VEZ CONVERTIDO LOS DATOS A JSON, EXTRAEMOS EL NOMBRE DEL USUARIO.
  // console.log(item.nombre)

  appPages?: any[];

  Confirmacion() {
    console.log(this.item);

    if (this.item === 0) {
      this.appPages = [
        { title: 'Historia', url: '/historia', icon: 'information-circle' },
        { title: 'Servicios', url: '/servicios', icon: 'people-circle' },
        { title: 'Noticias', url: '/noticias', icon: 'megaphone' },
        { title: 'Videos', url: '/videos', icon: 'videocam' },
      ];
    } else {
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
        {
          title: 'Recuperar contraseña',
          url: '/recuperar-contrasena',
          icon: 'code-slash',
        },
      ];
    }
  }

  ionViewDidLoad() {
    this.Confirmacion();
  }

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    this.Confirmacion();
  }
}
