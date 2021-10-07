import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../models';
import { FirestoreService } from '../servicios/firestore.service';
import { Router} from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
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

  constructor(public db: FirestoreService, private router: Router, private menu: MenuController, private exampleService: FirestoreService, private loadingCtrl: LoadingController) { }

  ngOnInit() 
  {
    this.menu.enable(true)
    this.getProveedores()
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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
    this.presentLoading('Eliminando...');
    this.db.eliminarProvedor(id).then(() => {
      console.log('Proveedor eliminado')
    }).catch(error => {
      console.log(error)
    })
  }

}
