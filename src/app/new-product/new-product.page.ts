import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Product } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  products: Product[] = [];

  newProduct: Product = {
    id: '',
    name: '',
    price: null,
    category: '',
    color: '',
    material: '',
    stock: null,
    description: '', 
    uploadDate: new Date()
  }

  private path = 'Productos/'
  loading: any;

  constructor(public firestoreService: FirestoreService, public loadingController: LoadingController, public toastController: ToastController) {
   }

  ngOnInit() {
    const product = this.firestoreService.getProduct();
    if (product !== undefined) {
      this.newProduct = product;
    }
  }
  
  async saveProduct() {
    this.presentLoading();
    const data = this.newProduct;
    if (data.id === ''){
      data.id = this.firestoreService.getId();
    }
    const path = 'Productos';
    await this.firestoreService.createDoc<Product>(data, path, data.id).catch(res => {
      console.log('Error -> ', res);
    });
    this.presentToast('Guardado con éxito', 2000);
    this.loading.dismiss();
    this.newProduct = {
      id: '',
      name: '',
      price: null,
      category: '',
      color: '',
      material: '',
      stock: null,
      description: '', 
      uploadDate: new Date()
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
      duration: timing
    });
    toast.present();
  }

  getProduct() {
    this.firestoreService.getCollection<Product>(this.path).subscribe(res => {
      this.products = res;
    });
  }

}
