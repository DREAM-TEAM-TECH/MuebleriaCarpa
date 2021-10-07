import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesproveedoresPageRoutingModule } from './detallesproveedores-routing.module';

import { DetallesproveedoresPage } from './detallesproveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesproveedoresPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetallesproveedoresPage]
})
export class DetallesproveedoresPageModule {}
