import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddproveedorPageRoutingModule } from './addproveedor-routing.module';

import { AddproveedorPage } from './addproveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddproveedorPageRoutingModule
  ],
  declarations: [AddproveedorPage]
})
export class AddproveedorPageModule {}
