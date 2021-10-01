import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  createProduct: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Nuevo Producto';
  guardado = 'Guardar';
  loading: any;

  constructor(
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
  ) {
    this.createProduct = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      material: ['', Validators.required],
      stock: [null, Validators.required],
      description: ['', Validators.required],
      uploadDate: new Date(),
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.editProduct();
  }

  saveProduct() {
    this.presentLoading();
    const product: any = {
      name: this.createProduct.value.name,
      price: this.createProduct.value.price,
      category: this.createProduct.value.category,
      color: this.createProduct.value.color,
      material: this.createProduct.value.material,
      stock: this.createProduct.value.stock,
      description: this.createProduct.value.description,
      uploadDate: new Date(),
    }
    this.firestoreService
      .addProduct(product)
      .then(() => {
        this.presentToast('Guardado con exito', 2000);
        this.loading.dismiss();
        this.router.navigate(['/display-products']);
        console.log('Guardado exitoso');
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
      });
  }

  updateNewProduct() {
    this.submitted = true;
    if (this.createProduct.invalid) {
      this.presentAlert();
      console.log('Error en acceder al producto');
      return;
    }
    if (this.id === null) {
      this.saveProduct();
      console.log('Guardar producto');
    } else {
      this.saveEditProduct(this.id);
      console.log('Editar producto');
    }
  }

  saveEditProduct(id: string) {
    this.presentLoading();
    const product: any = {
      name: this.createProduct.value.name,
      price: this.createProduct.value.price,
      category: this.createProduct.value.category,
      color: this.createProduct.value.color,
      material: this.createProduct.value.material,
      stock: this.createProduct.value.stock,
      description: this.createProduct.value.description,
      uploadDate: new Date(),
    };
    this.firestoreService.updateProduct(id, product).then(() => {
      this.presentToast('Guardado con exito', 2000);
      this.loading.dismiss();
      this.router.navigate(['/display-products']);
    });
  }

  editProduct() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this.guardado = 'Actualizar'
      this.firestoreService.setProduct(this.id).subscribe(data => {
        console.log(data.payload.data()['name']);
        this.createProduct.setValue({
          name: data.payload.data()['name'],
          price: data.payload.data()['price'],
          category: data.payload.data()['category'],
          color: data.payload.data()['color'],
          material: data.payload.data()['material'],
          stock: data.payload.data()['stock'],
          description: data.payload.data()['description'],
          uploadDate: new Date(),
        });
      });
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string, timing: number) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: timing,
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Alerta',
      subHeader: 'Error en guardar producto',
      message: 'Todos los campos son obligatorios',
      buttons: ['Hecho']
    });

    await alert.present();
  }
}