import { Component, OnInit } from '@angular/core';

interface IFormatoIntegrantes {
  nombreCompleto: string;
  telefono: string;
  foto: string;
  link: string;
}

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
})
export class IntegrantesPage implements OnInit {
  arr: IFormatoIntegrantes[] = [];

  constructor() {
    this.Obtener();
  }

  ngOnInit() {}

  Obtener() {
    this.arr = [
      {
        nombreCompleto: 'Miguel Angel Cruz Fernández',
        telefono: '829-341-7900',
        foto: '../../assets/images/foto-miguel.jpg',
        link: 'https://t.me/MikeCruz17'
      },

      {
        nombreCompleto: 'Jaime David Terrero Félix',
        telefono: '829-877-7227',
        foto: '../../assets/images/foto-jaime.jpg',
        link: 'https://t.me/MikeCruz17'
      },

      {
        nombreCompleto: 'Delvisson Ogando Velez',
        telefono: '829-729-0958',
        foto: '../../assets/images/foto-delvisson.jpeg',
        link: 'https://t.me/MikeCruz17'
      },
    ];
    
  }

  // FUNCION QUE EJECUTA EL METODO AL CARGAR LA PAGINA.
  ionViewDidLoad() {
    this.Obtener();
  }
}
