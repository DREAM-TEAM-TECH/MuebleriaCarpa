import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Productos', url: '/display-products', icon: 'storefront' },
    { title: 'Proveedores', url: '/proveedores', icon: 'accessibility' },
    { title: 'Empleados', url: '/employee', icon: 'person' },
    { title: 'Ventas', url: '/ventas', icon: 'cash' },
  ];
  constructor() {}
  
}
