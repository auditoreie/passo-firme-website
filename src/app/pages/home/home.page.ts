import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { Products, ProductsService } from 'src/app/services/products.service';

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

  products: Products[]

  constructor(private menu: MenuController, private productsService: ProductsService) { }

  ngOnInit() {
    this.menu.enable(false);
    this.productsService.getAllProducts().subscribe(res => {
        this.products = res;
      });
    
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
