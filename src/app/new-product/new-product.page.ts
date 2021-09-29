import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Product } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

interface Category {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  products: Product[] = [];

  newProduct: Product = {
    id: this.firestoreService.getId(),
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

  constructor(public firestoreService: FirestoreService) {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
   }

  ngOnInit() {
    this.getProduct();
  }

  addProduct() {
    this.firestoreService.createDoc(this.newProduct, this.path, this.newProduct.id);
  }

  getProduct() {
    this.firestoreService.getCollection<Product>(this.path).subscribe(res => {
      this.products = res;
    });
  }

}
