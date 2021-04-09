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

  promotionalProducts: Products[]
  filteredList: Products[]
  products: Products[]

  isItemAvailable = false;
     
  constructor(private menu: MenuController, private productsService: ProductsService) { }

  ngOnInit() {
    this.menu.enable(false);
    this.productsService.getPromotionalProducts().subscribe(res => {
      this.promotionalProducts = res;
      console.log(res)
    });
    
    this.productsService.getAllProducts().subscribe(res => {
      this.products = res;
      console.log(res)
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
