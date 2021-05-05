import { Component, OnInit } from '@angular/core';
import { Product, ProductsService, ClickCounter } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: Product = {
    title: '',
    description: '',
    code: '',
    isPromotional: false,
    availableSizes: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  };

  click: ClickCounter = {
    id: 'totalClicks',
    upClick: +1,
    clicks: 0
  }

  productId = null;

  totalClicks: ClickCounter[]

  constructor(private menu: MenuController, private productsService: ProductsService, private loadingController: LoadingController, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.menu.enable(false);
    this.productId = this.route.snapshot.params['id'];
    if (this.productId)  {
      this.loadData();
    }
  }

  async loadData() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'transparent',
      message: 'Carregando..'
    });
    await loading.present();

    this.productsService.getProduct(this.productId).subscribe(res => {
      this.product = res;
      console.log(res)
    });

    this.productsService.getTotalClicks().subscribe(res => {
      this.totalClicks = res;
      loading.dismiss();
      console.log(res)
    });
  }

  buyActionButton(item) {
    const currentClickCount = item.clicks + this.click.upClick
    console.log(currentClickCount)
    const newClickCount = {
      ...item,
      clicks: currentClickCount
    }
    this.productsService.upClick(newClickCount, item.id)
    console.log('click', item.clicks)
  }
}
