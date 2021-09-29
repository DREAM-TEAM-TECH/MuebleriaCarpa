import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models';
import { FirestoreService } from '../../servicios/firestore.service';

@Component({
  selector: 'app-addproveedor',
  templateUrl: './addproveedor.page.html',
  styleUrls: ['./addproveedor.page.scss'],
})
export class AddproveedorPage implements OnInit {

  private path = '/Proveedores';

  Proveedor: Proveedor = 
  {
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

  constructor(public db: FirestoreService) { }

  ngOnInit() {
  }

  guardar()
  {
    const id = this.db.getId();
    this.db.createDoc(this.Proveedor, this.path, id);
  }

}
