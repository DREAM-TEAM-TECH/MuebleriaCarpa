import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewVentaPageRoutingModule } from './new-venta-routing.module';

import { NewVentaPage } from './new-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    NewVentaPageRoutingModule
  ],
  declarations: [NewVentaPage]
})
export class NewVentaPageModule {}
