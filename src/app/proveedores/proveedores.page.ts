import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../models';
import { FirestoreService } from '../servicios/firestore.service';
import { Router} from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  private path = 'Proveedores/';

  proveedores: Proveedor[] = [];

  constructor(public db: FirestoreService, private router: Router, private menu: MenuController) { }

  ngOnInit() 
  {
    this.menu.enable(true)
    this.listar();
  }

  listar()
  {
    this.db.getCollection<Proveedor>(this.path).subscribe(res => {
      this.proveedores = res;
    });
  }

  add(){this.router.navigate(['/addproveedor'])}

}
