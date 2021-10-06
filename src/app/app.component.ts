import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './servicios/firestore.service';
import { TabsService } from './servicios/tab.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Nuevo Producto', url: '/new-product', icon: 'add-circle' },
  ];
  constructor(public tabs: TabsService, private authService: FirestoreService, private router: Router) 
  {
  }

  ngOnInit() 
  {
  }

  salir()
  {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
 