import { Component, OnInit } from '@angular/core';
import { Product } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.page.html',
  styleUrls: ['./display-products.page.scss'],
})
export class DisplayProductsPage implements OnInit {

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

  getProduct() {
    this.firestoreService.getCollection<Product>(this.path).subscribe(res => {
      this.products = res;
    });
  }
}
