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
    children:[{
        path:'',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule), canActivate: [AuthGuard]
      },
      {
        path: ':employeeId',
        loadChildren: () => import('./employee/employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule), canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'employee-add',
    loadChildren: () => import('./employee/employee-add/employee-add.module').then(m => m.EmployeeAddPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'employee-edit/:employeeId',
    loadChildren: () => import('./employee/employee-add/employee-add.module').then(m => m.EmployeeAddPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'new-product',
    loadChildren: () => import('./new-product/new-product.module').then(m => m.NewProductPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'edit-product/:id',
    loadChildren: () => import('./new-product/new-product.module').then(m => m.NewProductPageModule), canActivate: [AuthGuard]
  },
  {
<<<<<<< HEAD
=======
    path: 'display-products',
    loadChildren: () => import('./display-products/display-products.module').then(m => m.DisplayProductsPageModule), canActivate: [AuthGuard]
  },
  {
>>>>>>> main
    path: 'proveedores',
    loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'new-venta',
    loadChildren: () => import('./new-venta/new-venta.module').then( m => m.NewVentaPageModule)
  },
  {
    path: 'addproveedor',
    loadChildren: () => import('./proveedores/addproveedor/addproveedor.module').then(m => m.AddproveedorPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'editproveedor/:id',
    loadChildren: () => import('./proveedores/addproveedor/addproveedor.module').then(m => m.AddproveedorPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'detallesproveedores/:id',
    loadChildren: () => import('./proveedores/detallesproveedores/detallesproveedores.module').then(m => m.DetallesproveedoresPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then(m => m.RegistrarsePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }