import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayProductsPage } from './display-products.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayProductsPageRoutingModule {}
