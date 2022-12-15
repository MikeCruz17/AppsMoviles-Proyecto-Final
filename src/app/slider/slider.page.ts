import { Component, OnInit } from '@angular/core';

import SwiperCore, {

  Autoplay,
  Keyboard, 
  Pagination,
  Scrollbar,
  Zoom,
  EffectCoverflow

} from 'swiper';

SwiperCore.use([

  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom, 
  EffectCoverflow

]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
