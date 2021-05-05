import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';

//Components
import { NavbarPageModule } from 'src/app/components/navbar/navbar.module';
import { FooterPageModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    NavbarPageModule,
    FooterPageModule
  ],
  declarations: [ProductDetailsPage]
})
export class ProductDetailsPageModule {}
