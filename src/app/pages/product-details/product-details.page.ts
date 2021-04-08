import { Component, OnInit } from '@angular/core';
import { Products, ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: Products = {
    title: '',
    description: '',
    code: '',
    category: '',
    isPromototional: false,
    availableSizes: [''],
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  };
 
  productId = null;

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
      loading.dismiss();
      console.log(res)
    });
  }
}
