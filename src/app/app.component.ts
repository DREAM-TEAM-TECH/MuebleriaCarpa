import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './servicios/firestore.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email: string; 

  public appPages = [
    { title: 'Productos', url: '/display-products', icon: 'storefront' },
    { title: 'Proveedores', url: '/proveedores', icon: 'accessibility' },
    { title: 'Empleados', url: '/employee', icon: 'person' },
    { title: 'Ventas', url: '/ventas', icon: 'cash' },
  ];
  constructor(private authService: FirestoreService, private router: Router) {}
  salir()
  {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}