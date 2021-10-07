import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewVentaPage } from './new-venta.page';

const routes: Routes = [
  {
    path: '',
    component: NewVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewVentaPageRoutingModule {}
