import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Product } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.page.html',
  styleUrls: ['./display-products.page.scss'],
})
export class DisplayProductsPage implements OnInit {

  products: any[] = [];

  private path = 'Productos/'

  constructor(public firestoreService: FirestoreService, private menu: MenuController, private router: Router) {
   }

  ngOnInit() {
    this.menu.enable(false);
    this.getProduct();
  }

  addProduct() {
    this.router.navigate(['/new-product'])
  }

  getProduct() {
    this.firestoreService.getProduct().subscribe(data => {
      this.products = [];
      data.forEach((element:any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteProduct(id: string) {
    this.firestoreService.deleteProduct(id).then(() => {
      console.log('Producto eliminado');
    }).catch(error => {
      console.log(error);
    })
  }
}