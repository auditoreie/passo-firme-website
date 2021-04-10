import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Products, ProductsService } from 'src/app/services/products.service';

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
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  };

  constructor(private productsService: ProductsService, private loadingController: LoadingController, private router: Router, private toastCtrl: ToastController,) { }

  ngOnInit() {
    this.loadData()
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
  }

  saveProduct() {
    this.productsService.addProduct(this.product).then(() => {
      this.exibicaoAtual = "listagemProdutos"
      this.showToast('Produto adicionado com sucesso!')
    }, err => {
      this.showToast('Houve algum problema ao adicionar esse produto.');
    })
  }

  deleteProduct() {
    if (this.product.id !== undefined && this.parsedResult !== undefined) {
    this.productsService.deleteProduct(this.product.id).then(() => {
      console.log(this.product.id)
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
