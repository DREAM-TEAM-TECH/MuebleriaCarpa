import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProductPageRoutingModule } from './new-product-routing.module';

import { NewProductPage } from './new-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewProductPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe],
  declarations: [NewProductPage]
})
export class NewProductPageModule {}
