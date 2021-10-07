import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jsonEval, Observable } from '@firebase/util';
import { AlertController, LoadingController } from '@ionic/angular';
import { Empleado, pData, Product } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.page.html',
  styleUrls: ['./new-venta.page.scss'],
})
export class NewVentaPage implements OnInit {

  sellForm: FormGroup;
  Productos: Product[] = [];
  Empleados: Empleado[] = [];
  pData: pData[] = [];
  total: number;

  private path = "/Productos";
  private path2 = "/Empleados";
  
  cantidadList:Array<any> = [];
  descuentoList:Array<any> = [5,10,15,20,25,30];

  constructor(public db: FirestoreService, private router: Router, private aRoute: ActivatedRoute,private fb: FormBuilder, public alertController: AlertController, public loadingController: LoadingController) { 
    this.sellForm = this.fb.group({
      producto: ["", Validators.required],
      cantidad: [null, Validators.required],
      cajero: ["", Validators.required],
      comprador: ["", Validators.required],
      subtotal: [null],
      descuento: [null, Validators.required],
      total: [null],
    })

    this.cantidadList = Array.from({length: 100}, (_, i) => i + 1);
  }

  ngOnInit() {
    this.db.getCollection<Product>(this.path).subscribe(res => {
      this.Productos = res;
    });

    this.db.getCollection<Empleado>(this.path2).subscribe(res => {
      this.Empleados = res;
    });
  }

  onChange($event){
    this.db.getProductData($event.target.value).subscribe(data => {
      this.pData = data;
      if(Number(this.sellForm.get("cantidad").value) == 0){
        this.total = this.pData[0].price - (this.pData[0].price * (this.sellForm.get("descuento").value/100));
      }else{
        this.total = (this.pData[0].price * Number(this.sellForm.get("cantidad").value)) - (this.pData[0].price * (this.sellForm.get("descuento").value/100));
      }
    });
  }

  onCanChange($event){
    if(Number(this.sellForm.get("cantidad").value) == 0){
      this.total = this.pData[0].price - (this.pData[0].price * (this.sellForm.get("descuento").value/100));
    }else{
      this.total = (this.pData[0].price * Number(this.sellForm.get("cantidad").value)) - (this.pData[0].price * (this.sellForm.get("descuento").value/100));
    }
  }

  onDChange($event){
    if(Number(this.sellForm.get("cantidad").value) == 0){
      this.total = this.pData[0].price - (this.pData[0].price * (this.sellForm.get("descuento").value/100));
    }else{
      this.total = (this.pData[0].price * Number(this.sellForm.get("cantidad").value)) - (this.pData[0].price * (this.sellForm.get("descuento").value/100));
    }
  }

  addSell(){

    const venta: any = {
      producto: this.sellForm.get("producto").value,
      cantidad: Number(this.sellForm.get("cantidad").value),
      cajero: this.sellForm.get("cajero").value,
      comprador: this.sellForm.get("comprador").value,
      subtotal: this.pData[0].price,
      descuento: Number(this.sellForm.get("descuento").value),
      total: this.total,
    }

    this.db.agregarVenta(venta).then(() =>{
      console.log('Venta registrada!');
    }).catch(error => {
      console.log(error);
    })

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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.presentAlertVenta();
  }

  async presentAlertVenta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!',
      message: 'Venta registrada',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onSubmit(){
    if(this.sellForm.valid && this.total != 0 && this.pData[0].price != 0){
      console.log("valid");
      this.presentLoading();
      this.addSell();
      this.router.navigate(['/ventas'])
    }else{
      console.log("Not valid");
      this.presentAlert();
    }
  }

  clear() {
    this.sellForm.reset();
    this.router.navigate(['/ventas'])
    console.log('Saliendo')
  }

}
