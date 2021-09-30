import { Component, OnInit } from '@angular/core';
import { Product, Proveedor } from 'src/app/models';
import { FirestoreService } from '../../servicios/firestore.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-addproveedor',
  templateUrl: './addproveedor.page.html',
  styleUrls: ['./addproveedor.page.scss'],
})
export class AddproveedorPage implements OnInit {

  private path = '/Proveedores';

  private path2 = '/Productos';


  Productos: Product[] = [];

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

  constructor(public db: FirestoreService, private router: Router) { }

  ngOnInit() 
  {
    this.db.getCollection<Product>(this.path2).subscribe(res => {
      this.Productos = res;
    });
  }

  guardar()
  {
    this.Proveedor.id = this.db.getId();
    this.db.createDoc(this.Proveedor, this.path, this.Proveedor.id);
    this.router.navigate(['/proveedores'])
    this.resetForm(); 
  }

  resetForm()
  {
    this.Proveedor.nombre= null;
    this.Proveedor.apellido= null; 
    this.Proveedor.producto= null;
    this.Proveedor.estado= null; 
    this.Proveedor.municipio= null; 
    this.Proveedor.colonia= null; 
    this.Proveedor.calle= null; 
    this.Proveedor.codigo_postal= null; 
    this.Proveedor.num_exterior= null; 
    this.Proveedor.telefono= null; 
    this.Proveedor.empresa= null; 
  }

}
