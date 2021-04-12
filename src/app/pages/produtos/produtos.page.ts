import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Products, ProductsService } from 'src/app/services/products.service';
import { FileUpload } from '../_models/fileUpload';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  currentPage = 0

  exibicaoAtual = "listagemProdutos"

  products: Products[]

  product: Products = {
    title: '',
    description: '',
    code: '',
    isPromotional: false,
    availableSizes: '',
    image1: '../../../assets/default-img.jpg',
    image2: '../../../assets/default-img.jpg',
    image3: '../../../assets/default-img.jpg',
    image4: '../../../assets/default-img.jpg',
  };

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

  constructor(private productsService: ProductsService,
    private loadingController: LoadingController,
    private router: Router, 
    private toastCtrl: ToastController,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,) { }

  ngOnInit() {
    this.loadData()
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
    this.selectedFilesForImage1 = undefined

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

  uploadImage2(): void {
    const file = this.selectedFilesForImage2.item(0)
    this.selectedFilesForImage2 = undefined

    this.currentFileUploadForImage2 = new FileUpload(file)
    
      const filePath = `${this.basePath}/${this.currentFileUploadForImage2.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.currentFileUploadForImage2.file);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.currentFileUploadForImage2.url = downloadURL;
            this.product.image2 = downloadURL
            console.log(downloadURL)
            this.currentFileUploadForImage2.name = this.currentFileUploadForImage2.file.name;
            this.saveFileDataFromImage2(this.currentFileUploadForImage2);
          });
        })
      ).subscribe();
  }

  uploadImage3(): void {
    const file = this.selectedFilesForImage3.item(0)
    this.selectedFilesForImage3 = undefined

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

  uploadImage4(): void {
    const file = this.selectedFilesForImage4.item(0)
    this.selectedFilesForImage4 = undefined

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

  goToNewProductPage() {
    this.exibicaoAtual = "novoProduto"
  }

  async loadData() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'transparent',
      message: 'Carregando..'
    });
    await loading.present();
 
    this.productsService.getAllProducts().subscribe(res => {
      this.products = res;
      this.currentPage = 1
      loading.dismiss();
      console.log(res)
    });
  }

  pageItems() {
    let currentItem = 0
    let maxListSize = 9
    if (this.currentPage > 0) {
      currentItem = maxListSize * this.currentPage - 9
      maxListSize = maxListSize + currentItem
      return this.products.slice(currentItem, maxListSize)
    }
  }

  generatePagesArrayByAmount = (pagesAmount: number) =>
    [ ...Array(pagesAmount).keys() ].map(item => item + 1)

  listAvailablePages = (allProducts: any[]) => {
    const MAX_ITEMS_PER_PAGE = 9
    if (this.currentPage > 0) {
      const totalPages = Math.ceil(this.products.length / MAX_ITEMS_PER_PAGE)
      return this.generatePagesArrayByAmount(totalPages) 
    }
  }

  parsePageNumbers = (availablePages: any[], currentPage: number) => {
    if (this.currentPage > 0) {
      const isCurrentPageSmallerThanMinPagesToShow = this.currentPage <= 3
      const isCurrentPageNearMaxLengthToShow = this.currentPage >= availablePages.length - 2
      if (isCurrentPageSmallerThanMinPagesToShow) {
        const currentPaginationList = availablePages.slice(0, 5)
        if (currentPaginationList.length < availablePages.length) {
          return [...currentPaginationList, '...']
        }
        return currentPaginationList
      }
      if (isCurrentPageNearMaxLengthToShow) {
        const startPosition = availablePages.length - 5 < 0
          ? 0
          : availablePages.length - 5
        const currentPaginationList = availablePages.slice(startPosition, availablePages.length)
        if ( currentPaginationList[0] !== 1) {
          return [ '...', ...currentPaginationList]
        }
        return currentPaginationList
      }
      return [ '...', ...availablePages.slice(this.currentPage - 3, this.currentPage + 2), '...']
    }
  }

  parsedResult() {
    if (this.currentPage > 0) {
      const pageNumbers = this.listAvailablePages(this.products)
      const result = this.parsePageNumbers(pageNumbers, this.currentPage) 
      return [ ...result] 
    }
  }

  lastResultItem() {
    return this.parsedResult().length
  }
   
  nextPage() {
    this.currentPage++
    console.log(this.currentPage)
  }

  prevPage() {
    this.currentPage / this.currentPage--
    console.log(this.currentPage)
  }

  goToPage(newPage: number) {
    const oldPage = this.currentPage
    this.currentPage = newPage +1
  }

  cancelAction() {
    this.exibicaoAtual = "listagemProdutos"
    this.product.title = ''
    this.product.image1 = ''
    this.product.description = ''
    this.product.code = ''
    this.product.isPromotional = false
    this.product.availableSizes = ''
    this.product.image1 = '../../../assets/default-img.jpg'
    this.product.image2 = '../../../assets/default-img.jpg'
    this.product.image3 = '../../../assets/default-img.jpg'
    this.product.image4 = '../../../assets/default-img.jpg'
    this.percentageForImage1 = 0
    this.percentageForImage2 = 0  
    this.percentageForImage3 = 0  
    this.percentageForImage4 = 0  
  }

  addProduct() {
    this.productsService.addProduct(this.product).then(() => {
      this.exibicaoAtual = "listagemProdutos"
      this.showToast('Produto adicionado com sucesso!')
    }, err => {
      this.showToast('Houve algum problema ao adicionar esse produto.');
    })
    this.product.title = ''
    this.product.image1 = ''
    this.product.description = ''
    this.product.code = ''
    this.product.isPromotional = false
    this.product.availableSizes = ''
    this.product.image1 = '../../../assets/default-img.jpg'
    this.product.image2 = '../../../assets/default-img.jpg'
    this.product.image3 = '../../../assets/default-img.jpg'
    this.product.image4 = '../../../assets/default-img.jpg'
    this.percentageForImage1 = 0
    this.percentageForImage2 = 0  
    this.percentageForImage3 = 0  
    this.percentageForImage4 = 0     
  }

  deleteProduct(id) {
    if (window.confirm('Você tem certeza que quer deletar esse produto?')) { 
    this.productsService.deleteProduct(id).then(() => {
      console.log(id)
      this.showToast('Produto deletado com sucesso!')
    }, err => {
      this.showToast('Houve um problema ao deletar esse produto.')
    })
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present())
  }
}
