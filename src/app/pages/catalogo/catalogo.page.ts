import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Products, Categories, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  currentPage = 0

  slideOpts = {
    slidesPerView: 3,
    spaceBetween: 20
  };

  category: Categories = {
    title: ''
  }

  products: Products[]
  categories: Categories[]
  filteredList: Products[]

  isItemAvailable = false;
  isCategorySeeOptionEnable = false;

  constructor(private menu: MenuController, private productsService: ProductsService) { }

  ngOnInit() {
    this.menu.enable(false);
    this.productsService.getAllProducts().subscribe(res => {
        this.products = res;
        this.currentPage = 1
      });
    this.productsService.getAllCategories().subscribe(categories => {
        this.categories = categories;
    });
  }

  seeCategory(id) {
    this.isCategorySeeOptionEnable = true
    console.log(id)
  }

  filterList(event: any) {
    // Valor da barra de pesquisa
    const searchTerm = event.target.value;

    // Se o valor for igual a uma string vazia, os itens não são filtrados
    if (searchTerm && searchTerm.trim() !== '') {
        this.isItemAvailable = true
        this.filteredList = this.products.filter((item) => {
            return (item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        }) 
    } else {
        this.isItemAvailable = false
        return this.filteredList = this.products
    }
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
}
