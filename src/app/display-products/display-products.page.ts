import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.page.html',
  styleUrls: ['./display-products.page.scss'],
})
export class DisplayProductsPage implements OnInit {
  products: any[] = [];
  loading: any;

  constructor(
    public firestoreService: FirestoreService,
    private router: Router,
    private alertController: AlertController, 
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  addProduct() {
    this.router.navigate(['/new-product']);
  }

  getProduct() {
    this.firestoreService.getProduct().subscribe((data) => {
      this.products = [];
      data.forEach((element: any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  async deleteProduct(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: '¿Seguro desea <strong>eliminar</strong> el producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreService
              .deleteProduct(id)
              .then(() => {
                this.presentToast('Eliminado con exito', 2000);
                console.log('Producto eliminado');
              })
              .catch((error) => {
                this.presentToast('Eliminado fallido', 2000);
                console.log(error);
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(msg: string, timing: number) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: timing,
    });
    toast.present();
  }
}
