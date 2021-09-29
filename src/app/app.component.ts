import { Component } from '@angular/core';
import { TabsService } from './servicios/tab.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Nuevo Producto', url: '/new-product', icon: 'add-circle' },
  ];
  constructor(public tabs: TabsService) {}
}
