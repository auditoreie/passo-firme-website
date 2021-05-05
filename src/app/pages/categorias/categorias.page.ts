import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Category, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  currentPage = 0

  exibicaoAtual = "listagemCategorias"

  categories: Category[]

  category: Category = {
    createdAt: new Date().getTime(),
    title: ''
  }

  constructor(private productsService: ProductsService, private loadingController: LoadingController, private toastCtrl: ToastController, private menu: MenuController) { }

  ngOnInit() {
    this.loadData()
  }

  goToNewCategoryPage() {
    this.exibicaoAtual = "novaCategoria"
  }

  async loadData() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'transparent',
      message: 'Carregando..'
    });
    await loading.present();

    this.productsService.getAllCategories().subscribe(res => {
      this.categories = res;
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
      return this.categories.slice(currentItem, maxListSize)
    }
  }

  generatePagesArrayByAmount = (pagesAmount: number) =>
    [ ...Array(pagesAmount).keys() ].map(item => item + 1)

  listAvailablePages = (allProducts: any[]) => {
    const MAX_ITEMS_PER_PAGE = 9
    if (this.currentPage > 0) {
      const totalPages = Math.ceil(this.categories.length / MAX_ITEMS_PER_PAGE)
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
      const pageNumbers = this.listAvailablePages(this.categories)
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
    this.exibicaoAtual = "listagemCategorias"
    this.category.title = ''
  }

  addCategory() {
    this.productsService.addCategory(this.category).then(() => {
      this.exibicaoAtual = "listagemCategorias"
      this.showToast('Categoria adicionada com sucesso!')
    }, err => {
      this.showToast('Houve algum problema ao adicionar essa categoria.');
    })
    this.category.title = ''
  }

  deleteCategory(id) {
    console.log(id)
    if (window.confirm('Você tem certeza que quer deletar essa categoria?')) {
    this.productsService.deleteCategory(id).then(() => {
      console.log(id)
      this.showToast('Categoria deletada com sucesso!')
    }, err => {
      this.showToast('Houve um problema ao deletar essa categoria.')
    })
    }
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
