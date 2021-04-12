import { Component, OnInit } from '@angular/core';
import { Categories, ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {

  categories: Categories[]

  category: Categories = {
    title: ''
  }

  categoryId = null;

  constructor(
    private productsService: ProductsService, 
    private loadingController: LoadingController,
    private route: ActivatedRoute,  
    private router: Router, 
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'transparent',
      message: 'Carregando..'
    });
    await loading.present();
    let id = this.route.snapshot.paramMap.get('id');
    this.categoryId = id
    if (id) {
      this.productsService.getCategory(id).subscribe(category => {
        this.category = category;
        loading.dismiss();
      });
    }
  }

  cancelAction() {
    this.router.navigateByUrl('/categorias');
  }

  saveCategory() {
    this.category.id = this.categoryId
    this.productsService.updateCategory(this.category).then(() => {
      this.router.navigateByUrl('/categorias');
      this.showToast('Categoria editada com sucesso!')
    }, err => {
      this.showToast('Houve algum problema ao editar essa categoria.')
    })
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present())
  }
}
