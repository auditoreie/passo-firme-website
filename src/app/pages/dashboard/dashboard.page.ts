import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Categories, Products, ClickCounter, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  products: Products[]
  promotionalProducts: Products[]
  categories: Categories[]
  totalClicks: ClickCounter[]

  totalProductsItems: number
  totalPromotionalProductsItems: number
  totalCategoriesItems: number
  totalClickInItems: number

  click: ClickCounter = {
    id: 'totalClicks',
    upClick: +1,
    clicks: 0
  }

  constructor(private productsService: ProductsService, private loadingController: LoadingController,) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'transparent',
      message: 'Carregando..'
    });
    await loading.present();

    this.productsService.getAllProducts().subscribe(res => {
      this.products = res;
      this.totalProductsItems = this.products.length
      console.log(res, this.products.length)
    });

    this.productsService.getPromotionalProducts().subscribe(res => {
      this.promotionalProducts = res;
      this.totalPromotionalProductsItems = this.promotionalProducts.length
      console.log(res, this.promotionalProducts.length)
    });

    this.productsService.getAllCategories().subscribe(res => {
      this.categories = res;
      this.totalCategoriesItems = this.categories.length
      console.log(res, this.categories.length)
    });

    this.productsService.getTotalClicks().subscribe(res => {
      this.totalClicks = res;
      loading.dismiss();
      console.log(res)
    });
  }
}
