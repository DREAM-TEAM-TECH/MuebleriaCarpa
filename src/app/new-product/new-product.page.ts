import { AfterContentChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Category, Color, Material } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit, AfterViewInit{
  createProduct: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Nuevo Producto';
  guardado = 'Guardar';
  loading: any;

  categories: Category[] = [];
  materials: Material[] = [];
  colors: Color[] = [];

  private pathCategory = '/Categoria';
  private pathMaterial = '/Material';
  private pathColor = '/Color';

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
      showCategory: [''],
      category: ['', Validators.required],
      showColor: [''],
      color: ['', Validators.required],
      showMaterial: [''],
      material: ['', Validators.required],
      stock: [null, Validators.required],
      description: ['', Validators.required],
      uploadDate: new Date(),
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngAfterViewInit(): void {
    this.editProduct();
    this.foreignKeysInit();
  }

  ngOnInit(): void {
    this.foreignKeysInit();
  }

  clear() {
    this.createProduct.reset();
    this.router.navigate(['/display-products'])
    this.ngAfterViewInit();
    console.log('Saliendo')
  }

  foreignKeysInit() {
    this.firestoreService.getCollection<Category>(this.pathCategory).subscribe(res => {
      this.categories = res;
    }) 
    this.firestoreService.getCollection<Material>(this.pathMaterial).subscribe(res => {
      this.materials = res;
    })
    this.firestoreService.getCollection<Color>(this.pathColor).subscribe(res => {
      this.colors = res;
    })
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
      this.createProduct.reset();
      console.log('Guardar producto');
    } else {
      this.saveEditProduct(this.id);
      this.createProduct.reset();
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
        this.createProduct.setValue({
          name: data.payload.data()['name'],
          price: data.payload.data()['price'],
          showCategory: data.payload.data()['category'],
          category: data.payload.data(),
          showColor: data.payload.data()['color'],
          color: data.payload.data(),
          showMaterial: data.payload.data()['material'],
          material: data.payload.data(),
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