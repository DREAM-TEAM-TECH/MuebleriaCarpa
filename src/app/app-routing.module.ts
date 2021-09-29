import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
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
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
