import { Injectable, Query } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private AFauth :  AngularFireAuth, public database: AngularFirestore) { }

  login(email:string, password:string)
  {
    return new Promise((resolve, rejected) =>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user)
      }).catch(err => rejected(err));
    });
  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  getId() {
    return this.database.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

  //Reactive Forms ADDVENTA
  agregarVenta(venta: any): Promise<any>{
    return this.database.collection('Ventas').add(venta);
  }

  getProductData(name: string): Observable<any>{
    return this.database.collection("Productos", ref => ref.where("name", '==', name)).valueChanges();
  }

  //DISPLAY VENTAS

  deleteVenta(producto: string, cantidad: number , cajero: string, comprador: string, subtotal: number, descuento: number, total: number): Observable<any>{
    return this.database.collection("Ventas", ref => ref.where("producto", "==", producto)
    .where("cantidad", "==", cantidad)
    .where("cajero", "==", cajero)
    .where("comprador", "==", comprador)
    .where("subtotal", "==", subtotal)
    .where("descuento", "==", descuento)
    .where("total", "==", total)
    ).snapshotChanges()
  }
}
