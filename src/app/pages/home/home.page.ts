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

  promotionalProducts: Products[]
  recentProducts: Products[]
  filteredList: Products[]
  products: Products[]
  categories: Categories[]

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

    this.productsService.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log(res)
    });

    this.productsService.getRecentProducts().subscribe(res => {
      this.recentProducts = res;
      console.log('produtos adicionados recentemente', res)
    });

    this.initializeDefaultList();
  }

  initializeDefaultList() {
    this.productsService.getAllProducts().subscribe(res => {
      this.filteredList = res;
      console.log(res)
    }); 
  } 

  filterList(event: any) {
    // Valor da barra de pesquisa
    const searchTerm = event.target.value;

    // Se o valor for igual a uma string vazia, os itens não são filtrados
    if (searchTerm && searchTerm.trim() !== '') {
        this.isItemAvailable = true;
        this.filteredList = this.products.filter((item) => {
            return (item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }) 
    } else {
        this.isItemAvailable = false;
        return this.filteredList = this.products
    }
  }

  nextProductSlide() {
    this.productSlides.slideNext();
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
