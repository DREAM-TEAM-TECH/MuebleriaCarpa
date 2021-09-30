import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddproveedorPage } from './addproveedor.page';

const routes: Routes = [
  {
    path: '',
    component: AddproveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddproveedorPageRoutingModule {}
