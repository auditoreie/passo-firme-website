import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {

  currentPage: string

  constructor(private router: Router) { }

  ngOnInit() {
     this.currentPage = this.router.url
     console.log('Página atual:', this.currentPage)
  }

}
