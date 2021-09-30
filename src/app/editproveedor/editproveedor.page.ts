import { Component, OnInit } from '@angular/core';
import { Product, Proveedor } from 'src/app/models';
import { FirestoreService } from '../servicios/firestore.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-editproveedor',
  templateUrl: './editproveedor.page.html',
  styleUrls: ['./editproveedor.page.scss'],
})
export class EditproveedorPage implements OnInit {

  private path = '/Proveedores';

  private path2 = '/Productos';

  private id = this.db.getId();

  Productos: Product[] = [];

  Proveedor: any;

  constructor(public db: FirestoreService, private router: Router) { }

  ngOnInit() 
  {
    this.db.getCollection<Product>(this.path2).subscribe(res => {
      this.Productos = res;
    });

    this.db.$getObjectSource.subscribe(data => {
      console.log(data)
      this.Proveedor = data;
    }).unsubscribe();
  }

  guardar()
  {
    this.db.createDoc(this.Proveedor, this.path, this.id);
    this.router.navigate(['/proveedores'])
  }


}
