import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../models';
import { FirestoreService } from '../servicios/firestore.service';
import { Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  proveedores: any[] = [];

  private path = '/Proveedores';


  Proveedor: Proveedor = 
  {
    id: '',
    nombre: '',
    apellido: '',
    producto: '',
    estado: '',
    municipio: '',
    colonia: '',
    calle: '',
    codigo_postal: null,
    num_exterior: null,
    telefono: null,
    empresa: null,
  };

  constructor(public db: FirestoreService, private router: Router, private menu: MenuController, private exampleService: FirestoreService) { }

  ngOnInit() 
  {
    this.menu.enable(true)
    this.getProveedores()
  }

  getProveedores()
{
  this.db.getProveedores().subscribe(data => {
    this.proveedores = [];
    data.forEach((element:any) => {
      this.proveedores.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    });
    console.log(this.proveedores)
  });
}

  add(){this.router.navigate(['/addproveedor'])}

  eliminarProveedor(id: string)
  {
    this.db.eliminarProvedor(id).then(() => {
      console.log('Proveedor eliminado')
    }).catch(error => {
      console.log(error)
    })
  }

}
