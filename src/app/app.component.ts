import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from './servicios/firestore.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  email: string; 

  public appPages = [
    { title: 'Productos', url: '/display-products', icon: 'add-circle' },
    { title: 'Proveedores', url: '/proveedores', icon: 'accessibility-outline' },
  ];
  constructor(private authService: FirestoreService, private router: Router) 
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
 