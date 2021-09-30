import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditproveedorPage } from './editproveedor.page';

const routes: Routes = [
  {
    path: '',
    component: EditproveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditproveedorPageRoutingModule {}
