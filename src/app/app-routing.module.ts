import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'employee-add',
    loadChildren: () => import('./employee/employee-add/employee-add.module').then(m => m.EmployeeAddPageModule)
  },
  {
    path:'employee-detail',
    children: [
      {
        path:'',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule)
      },
      {
        path:':employeeId',
        loadChildren: () => import('./employee/employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule)
      }
    ],
    
  }, 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'new-product',
    loadChildren: () => import('./new-product/new-product.module').then( m => m.NewProductPageModule), 
  },
  {
    path: 'display-products',
    loadChildren: () => import('./display-products/display-products.module').then( m => m.DisplayProductsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./proveedores/proveedores.module').then( m => m.ProveedoresPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'addproveedor',
    loadChildren: () => import('./proveedores/addproveedor/addproveedor.module').then( m => m.AddproveedorPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'editproveedor/:id',
    loadChildren: () => import('./proveedores/addproveedor/addproveedor.module').then( m => m.AddproveedorPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'detallesproveedores/:id',
    loadChildren: () => import('./proveedores/detallesproveedores/detallesproveedores.module').then( m => m.DetallesproveedoresPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}