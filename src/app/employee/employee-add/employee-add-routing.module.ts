import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAddPage } from './employee-add.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAddPageRoutingModule {}
