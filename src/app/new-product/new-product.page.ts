import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  category: Category[] = [];

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

  constructor(private router: Router ,public firestoreService: FirestoreService) {
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
