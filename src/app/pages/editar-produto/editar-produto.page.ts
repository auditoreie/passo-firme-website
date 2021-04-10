import { Component, OnInit } from '@angular/core';
import { Products, ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from '../_models/fileUpload';


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

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(
    private productsService: ProductsService, 
    private loadingController: LoadingController,
    private route: ActivatedRoute,  
    private router: Router, 
    private toastCtrl: ToastController,
    private uploadService: FileUploadService
  ) { }

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

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0)
    this.selectedFiles = undefined

    this.currentFileUpload = new FileUpload(file)
    this.currentFileUpload.url = new FileUpload(file).url
    console.log(this.currentFileUpload, this.currentFileUpload.url)
    
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    )
  }

  cancelAction() {
    this.router.navigateByUrl('/produtos');
  }

  saveProduct() {
    this.productsService.updateProduct(this.product).then(() => {
      this.router.navigateByUrl('/produtos');
      this.showToast('Produto editado com sucesso!')
    }, err => {
      this.showToast('Houve algum problema ao editar esse produto.');
    })
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present())
  }
}
