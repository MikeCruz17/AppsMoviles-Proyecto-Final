import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Historia', url: '/historia', icon: 'information-circle' },
    { title: 'Servicios', url: '/servicios', icon: 'people-circle' },
    { title: 'Noticias', url: '/noticias', icon: 'megaphone' },
    { title: 'Videos', url: '/videos', icon: 'videocam' },
    { title: 'Albergues', url: '/albergues', icon: 'business' },
    { title: 'Medidas', url: '/medidas', icon: 'warning' },
    { title: 'Miembros', url: '/miembros', icon: 'people' },
    { title: 'Voluntario', url: '/voluntario', icon: 'person-add' },
    { title: 'Acerca de', url: '/integrantes', icon: 'code-slash' },
 
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
