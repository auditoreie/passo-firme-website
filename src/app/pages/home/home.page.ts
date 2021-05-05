import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { Product, Category, ProductsService } from 'src/app/services/products.service';
import { removeAccents } from '../../helpers/accentsHelper';

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

  loading = false

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
  filteredList: Product[]
  products: Product[]
  categories: Category[]

  isItemAvailable = false;

  constructor(
    private menu: MenuController,
    private productsService: ProductsService,
    private contactService: ContactService
  ) {
  }

  ngOnInit() {
    this.menu.enable(false)
    this.initializeProducts()
    this.initializeCategories()
  }

  initializeProducts() {
    this.productsService.getAllProducts().subscribe(res => {
      this.products = res
      this.promotionalProducts = res.filter(product => product.isPromotional === true)
      this.recentProducts = res.reverse()
      this.filteredList = res
      console.log({
        promotional: this.promotionalProducts,
        recent: this.recentProducts,
        allProducts: this.products

      })
    })

  }

  initializeCategories() {
    this.productsService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  filterList(event: any): any {
    // Valor da barra de pesquisa
    const rawSearchTerm = event.target.value as string

    // Se o valor for igual a uma string vazia, os itens não são filtrados
    if (!rawSearchTerm || rawSearchTerm.trim() === '') {
      this.isItemAvailable = false;
      return this.filteredList = this.products
    }

    const normalizedSearchTerm = removeAccents(rawSearchTerm.toLowerCase())
    this.isItemAvailable = true;
    this.filteredList = this.products.filter((item) => {
      const normalizedTitle = removeAccents(item.title.toLowerCase())
      return (normalizedTitle.indexOf(normalizedSearchTerm) > -1);
    })
  }

  nextProductSlide2() {
    this.productSlides2.slideNext();
  }

  prevProductSlide() {
    this.productSlides.slidePrev();
  }

  prevProductSlide2() {
    this.productSlides2.slidePrev();
  }

  nextPromoSlide() {
    this.promoSlides.slideNext();
  }

  nextPromoSlide2() {
    this.promoSlides2.slideNext();
  }

  prevPromoSlide() {
    this.promoSlides.slidePrev();
  }

  prevPromoSlide2() {
    this.promoSlides2.slidePrev();
  }
}
