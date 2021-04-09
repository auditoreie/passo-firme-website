import { Component, OnInit } from '@angular/core';
import { Products, ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {

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

  constructor(private productsService: ProductsService, private loadingController: LoadingController, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
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
