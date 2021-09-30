import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditproveedorPageRoutingModule } from './editproveedor-routing.module';

import { EditproveedorPage } from './editproveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditproveedorPageRoutingModule
  ],
  declarations: [EditproveedorPage]
})
export class EditproveedorPageModule {}
