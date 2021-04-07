import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('productSlides') productSlides: IonSlides;
  @ViewChild('promoSlides') promoSlides: IonSlides;

  slideOpts = {
    slidesPerView: 3,
    spaceBetween: 20
  };

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  nextProductSlide() {
    this.productSlides.slideNext();
  }

  prevProductSlide() {
    this.productSlides.slidePrev();
  }

  nextPromoSlide() {
    this.promoSlides.slideNext();
  }

  prevPromoSlide() {
    this.promoSlides.slidePrev();
  }
}
