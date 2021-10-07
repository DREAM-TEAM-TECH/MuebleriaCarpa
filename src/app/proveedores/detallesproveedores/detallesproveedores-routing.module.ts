import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesproveedoresPage } from './detallesproveedores.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesproveedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesproveedoresPageRoutingModule {}
