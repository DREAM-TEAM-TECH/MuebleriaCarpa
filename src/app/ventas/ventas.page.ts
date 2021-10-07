import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable, pipe } from 'rxjs';
import { Empleado, Product, Venta } from '../models';
import { FirestoreService } from '../servicios/firestore.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  ventas: Venta[] = [];
  ventaId: string;

  private path = "Ventas/";

  constructor(public firestoreService: FirestoreService, private menu: MenuController) 
  {

  }

  ngOnInit() {
    this.getVenta();
  }

  getVenta() {
    this.firestoreService.getCollection<Venta>(this.path).subscribe(res => {
      this.ventas = res;
    });
  }

  deleteVenta(producto: string, cantidad: number , cajero: string, comprador: string, subtotal: number, descuento: number, total: number) {
    this.firestoreService.deleteVenta(producto,cantidad,cajero,comprador,subtotal,descuento,total).subscribe(data => {this.ventaId = data[0].payload.doc.id; this.firestoreService.deleteDoc(this.path, this.ventaId)});
  }
}