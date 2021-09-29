import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAddPageRoutingModule } from './employee-add-routing.module';

import { EmployeeAddPage } from './employee-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeAddPageRoutingModule
  ],
  declarations: [EmployeeAddPage]
})
export class EmployeeAddPageModule {}
