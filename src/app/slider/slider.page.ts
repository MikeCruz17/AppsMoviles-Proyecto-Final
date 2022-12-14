import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  banners: string[] = ["./assets/slider_images/noticias.png","./assets/slider_images/nuestros_servicios.png","./assets/slider_images/miembros.png","./assets/slider_images/miembro 1.png","./assets/slider_images/miembro 2.png","./assets/slider_images/miembro 3.png"]


  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,
    autoplay:{
      delay: 4000
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
