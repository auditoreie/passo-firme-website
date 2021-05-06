import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { Product, Category, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('productSlides') productSlides: IonSlides;
  @ViewChild('productSlides2') productSlides2: IonSlides;
  @ViewChild('promoSlides') promoSlides: IonSlides;
  @ViewChild('promoSlides2') promoSlides2: IonSlides;

  loading: boolean

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      480: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }

    }
  };

  slideOpts2 = {
    slidesPerView: 1,
    spaceBetween: 20
  }

  promotionalProducts: Product[]
  recentProducts: Product[]
  products: Product[]
  categories: Category[]

  constructor(
    private menu: MenuController,
    private productsService: ProductsService
  ) {
  }

  ngOnInit() {
    this.menu.enable(false)
    this.initializeProducts()
    this.initializeCategories()
  }

  initializeProducts() {
    this.loading = true
    this.productsService.getAllProducts().subscribe(res => {
      this.products = res
      this.promotionalProducts = res.filter(product => product.isPromotional === true)
      this.recentProducts = res.slice(Math.max(this.products.length -10, 0))
      console.log({
        promotional: this.promotionalProducts,
        recent: this.recentProducts,
        allProducts: this.products

      })
      this.loading = false
    })

  }

  initializeCategories() {
    this.productsService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  nextProductSlide() {
    this.productSlides.slideNext()
  }

  prevProductSlide() {
    this.productSlides.slidePrev()
  }

  nextPromoSlide() {
    this.promoSlides.slideNext()
  }

  prevPromoSlide() {
    this.promoSlides.slidePrev()
  }

}
