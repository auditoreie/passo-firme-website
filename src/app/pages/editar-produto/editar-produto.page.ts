import { Component, OnInit } from '@angular/core'
import { Product, ProductsService } from '../../services/products.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LoadingController, MenuController, ToastController } from '@ionic/angular'
import { FileUpload } from '../_models/fileUpload'
import { finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireDatabase } from '@angular/fire/database'


@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {

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

  productId = null;

  selectedFilesForImage1: FileList;
  currentFileUploadForImage1: FileUpload;
  selectedFilesForImage2: FileList;
  currentFileUploadForImage2: FileUpload;
  selectedFilesForImage3: FileList;
  currentFileUploadForImage3: FileUpload;
  selectedFilesForImage4: FileList;
  currentFileUploadForImage4: FileUpload;
  percentageForImage1: number;
  percentageForImage2: number;
  percentageForImage3: number;
  percentageForImage4: number;
  private basePath = '/uploads';

  constructor(
    private productsService: ProductsService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private menu: MenuController
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
    this.productId = id
    if (id) {
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product;
        loading.dismiss();
      });
    }
  }

  selectFileForImage1(event): void {
    this.percentageForImage1 = 0
    this.selectedFilesForImage1 = event.target.files;
  }

  selectFileForImage2(event): void {
    this.percentageForImage2 = 0
    this.selectedFilesForImage2 = event.target.files;
  }

  selectFileForImage3(event): void {
    this.percentageForImage3 = 0
    this.selectedFilesForImage3 = event.target.files;
  }

  selectFileForImage4(event): void {
    this.percentageForImage4 = 0
    this.selectedFilesForImage4 = event.target.files;
  }

  uploadImage1(): void {
    const file = this.selectedFilesForImage1.item(0)
    console.log(file)
    this.selectedFilesForImage1 = undefined

    if (file.size > 1000000) {
      return alert('Este arquivo é grande demais, por favor escolha outro arquivo menor')
    } else {

    this.currentFileUploadForImage1 = new FileUpload(file)

      const filePath = `${this.basePath}/${this.currentFileUploadForImage1.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.currentFileUploadForImage1.file);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.currentFileUploadForImage1.url = downloadURL;
            this.product.image1 = downloadURL
            console.log(downloadURL)
            this.currentFileUploadForImage1.name = this.currentFileUploadForImage1.file.name;
            this.saveFileDataFromImage1(this.currentFileUploadForImage1);
          });
        })
      ).subscribe();
    }
  }

  uploadImage2(): void {
    const file = this.selectedFilesForImage2.item(0)
    this.selectedFilesForImage2 = undefined

    if (file.size > 1000000) {
      return alert('Este arquivo é grande demais, por favor escolha outro arquivo menor')
    }

    this.currentFileUploadForImage2 = new FileUpload(file);

    const filePath = `${ this.basePath }/${ this.currentFileUploadForImage2.file.name }`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.currentFileUploadForImage2.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.currentFileUploadForImage2.url = downloadURL;
          this.product.image2 = downloadURL;
          console.log(downloadURL);
          this.currentFileUploadForImage2.name = this.currentFileUploadForImage2.file.name;
          this.saveFileDataFromImage2(this.currentFileUploadForImage2);
        });
      })
    ).subscribe();
  }

  uploadImage3(): void {
    const file = this.selectedFilesForImage3.item(0)
    this.selectedFilesForImage3 = undefined

    if (file.size > 1000000) {
      return alert('Este arquivo é grande demais, por favor escolha outro arquivo menor')
    } else {

    this.currentFileUploadForImage3 = new FileUpload(file)

      const filePath = `${this.basePath}/${this.currentFileUploadForImage3.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.currentFileUploadForImage3.file);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.currentFileUploadForImage3.url = downloadURL;
            this.product.image3 = downloadURL
            console.log(downloadURL)
            this.currentFileUploadForImage3.name = this.currentFileUploadForImage3.file.name;
            this.saveFileDataFromImage3(this.currentFileUploadForImage3);
          });
        })
      ).subscribe();
    }
  }

  uploadImage4(): void {
    const file = this.selectedFilesForImage4.item(0)
    this.selectedFilesForImage4 = undefined

    if (file.size > 1000000) {
      return alert('Este arquivo é grande demais, por favor escolha outro arquivo menor')
    } else {

    this.currentFileUploadForImage4 = new FileUpload(file)

      const filePath = `${this.basePath}/${this.currentFileUploadForImage4.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.currentFileUploadForImage4.file);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.currentFileUploadForImage4.url = downloadURL;
            this.product.image4 = downloadURL
            console.log(downloadURL)
            this.currentFileUploadForImage4.name = this.currentFileUploadForImage4.file.name;
            this.saveFileDataFromImage4(this.currentFileUploadForImage4);
          });
        })
      ).subscribe();
    }
  }

  private saveFileDataFromImage1(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload).then;
    this.percentageForImage1 = 100
  }

  private saveFileDataFromImage2(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload).then;
    this.percentageForImage2 = 100
  }

  private saveFileDataFromImage3(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload).then;
    this.percentageForImage3 = 100
  }

  private saveFileDataFromImage4(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload).then;
    this.percentageForImage4 = 100
  }

  cancelAction() {
    this.router.navigateByUrl('/produtos');
  }

  saveProduct() {
    this.product.id = this.productId
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

  openMenu() {
    this.menu.open()
  }
}
