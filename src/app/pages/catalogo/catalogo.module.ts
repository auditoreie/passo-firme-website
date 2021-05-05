import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';

//Components
import { NavbarPageModule } from 'src/app/components/navbar/navbar.module';
import { SearchbarPageModule } from 'src/app/components/searchbar/searchbar.module';
import { FooterPageModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    NavbarPageModule,
    SearchbarPageModule,
    FooterPageModule
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}
