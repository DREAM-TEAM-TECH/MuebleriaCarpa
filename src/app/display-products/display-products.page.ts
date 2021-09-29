import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Product } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.page.html',
  styleUrls: ['./display-products.page.scss'],
})
export class DisplayProductsPage implements OnInit {

  products: Product[] = [];

  private path = 'Productos/'

  constructor(public firestoreService: FirestoreService, private menu: MenuController) {
   }

  ngOnInit() {
    this.menu.enable(false);
    this.getProduct();
  }

  getProduct() {
    this.firestoreService.getCollection<Product>(this.path).subscribe(res => {
      this.products = res;
    });
  }

  deleteProduct(product : Product) {
    this.firestoreService.deleteDoc(this.path, product.id);
  }
}
