import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from 'src/app/services/products.service';
import { removeAccents } from '../../helpers/accentsHelper';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  isItemAvailable = false
  filteredList: Product[]
  products: Product[]

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.initializeProducts()
  }

  initializeProducts() {
    this.productsService.getAllProducts().subscribe(res => {
      this.products = res
      this.filteredList = res
      console.log({
        allProducts: this.products
      })
    })

  }

  filterList(event: any): any {
    // Valor da barra de pesquisa
    const rawSearchTerm = event.target.value as string

    // Se o valor for igual a uma string vazia, os itens não são filtrados
    if (!rawSearchTerm || rawSearchTerm.trim() === '') {
      this.isItemAvailable = false;
      return this.filteredList = this.products
    }

    const normalizedSearchTerm = removeAccents(rawSearchTerm.toLowerCase())
    this.isItemAvailable = true;
    this.filteredList = this.products.filter((item) => {
      const normalizedTitle = removeAccents(item.title.toLowerCase())
      return (normalizedTitle.indexOf(normalizedSearchTerm) > -1);
    })
  }

}
