import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayProductsPageRoutingModule } from './display-products-routing.module';

import { DisplayProductsPage } from './display-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayProductsPageRoutingModule
  ],
  declarations: [DisplayProductsPage]
})
export class DisplayProductsPageModule {}
