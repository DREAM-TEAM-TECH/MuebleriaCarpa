import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product, Proveedor } from 'src/app/models';
import { FirestoreService } from '../../servicios/firestore.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addproveedor',
  templateUrl: './addproveedor.page.html',
  styleUrls: ['./addproveedor.page.scss'],
})
export class AddproveedorPage implements OnInit, AfterViewInit {

  createProveedor: FormGroup;
  editProveedor: FormGroup;
  submitted = false; 

  private path2 = '/Productos';

  id: string | null; 
  titulo = 'Agregar proveedor'


  Productos: Product[] = [];

  constructor(public db: FirestoreService, private router: Router, private aRoute: ActivatedRoute, 
    private fb: FormBuilder, private loadingCtrl: LoadingController, public alertController: AlertController) 
  {
    this.createProveedor = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mostrarProducto: [''],
      producto: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      codigo_postal: [null , Validators.required],
      num_exterior: [null , Validators.required],
      telefono: [null , Validators.required],
      empresa: [null , Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }


  ngOnInit() 
  {
    this.db.getCollection<Product>(this.path2).subscribe(res => {
      this.Productos = res;
    }); 
    this.Listar();
  }

  ngAfterViewInit()
  {
    this.db.getCollection<Product>(this.path2).subscribe(res => {
      this.Productos = res;
    }); 
    this.Listar();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Faltan uno o mas campos de llenar',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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

  agregarProveedor()
  {
    this.presentLoading('Guardando...');
    const proveedor: any =
    {
      nombre: this.createProveedor.value.nombre, 
      apellido: this.createProveedor.value.apellido,
      producto: this.createProveedor.value.producto,
      estado: this.createProveedor.value.estado,
      municipio: this.createProveedor.value.municipio,
      colonia: this.createProveedor.value.colonia,
      calle: this.createProveedor.value.calle,
      codigo_postal: this.createProveedor.value.codigo_postal,
      num_exterior: this.createProveedor.value.num_exterior,
      telefono: this.createProveedor.value.telefono,
      empresa: this.createProveedor.value.empresa,

    }
    
    this.db.agregar(proveedor).then(() =>{
      console.log('proveedor registrado!');
      this.router.navigate(['/proveedores'])
    }).catch(error => {
      console.log(error);
    })
    
  }

  Actualizar()
  {
    this.submitted = true; 

    if(this.createProveedor.invalid)
    {
      this.presentAlert();
      return;
    }

    if(this.id === null)
    {
      this.agregarProveedor();
    }
    else
    {
      this.guardarEdit(this.id);
    }
  }

  guardarEdit(id: string)
  {
    this.presentLoading('Guardando cambios...');
    const proveedor: any =
    {
      nombre: this.createProveedor.value.nombre, 
      apellido: this.createProveedor.value.apellido,
      producto: this.createProveedor.value.producto,
      estado: this.createProveedor.value.estado,
      municipio: this.createProveedor.value.municipio,
      colonia: this.createProveedor.value.colonia,
      calle: this.createProveedor.value.calle,
      codigo_postal: this.createProveedor.value.codigo_postal,
      num_exterior: this.createProveedor.value.num_exterior,
      telefono: this.createProveedor.value.telefono,
      empresa: this.createProveedor.value.empresa,
    }

    this.db.actualizarProveedor(id, proveedor).then(() => {
      this.router.navigate(['/proveedores'])
    })
  }

  Listar()
  {
    if(this.id !== null)
    {
      this.titulo = 'Editar proveedor'
      this.db.getProveedor(this.id).subscribe(data => {
        this.createProveedor.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          mostrarProducto: data.payload.data()['producto'],
          producto: data.payload.data(),
          estado: data.payload.data()['estado'],
          municipio: data.payload.data()['municipio'],
          colonia: data.payload.data()['colonia'],
          calle: data.payload.data()['calle'],
          codigo_postal: data.payload.data()['codigo_postal'],
          num_exterior: data.payload.data()['num_exterior'],
          telefono: data.payload.data()['telefono'],
          empresa: data.payload.data()['empresa'],
        })
      })
    }
  }
}
