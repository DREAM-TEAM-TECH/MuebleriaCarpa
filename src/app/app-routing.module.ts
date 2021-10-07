import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    children:[{
        path:'',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule)
      },
      {
        path:':employeeId',
        loadChildren: () => import('./employee/employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule)
      }
    ]
  },
  {
    path: 'employee-add',
    loadChildren: () => import('./employee/employee-add/employee-add.module').then(m => m.EmployeeAddPageModule)
  },
  {
    path: 'employee-edit/:employeeId',
    loadChildren: () => import('./employee/employee-add/employee-add.module').then(m => m.EmployeeAddPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'new-product',
    loadChildren: () => import('./new-product/new-product.module').then( m => m.NewProductPageModule)
  },
  {
    path: 'display-products',
    loadChildren: () => import('./display-products/display-products.module').then( m => m.DisplayProductsPageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path: 'addproveedor',
    loadChildren: () => import('./proveedores/addproveedor/addproveedor.module').then( m => m.AddproveedorPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}