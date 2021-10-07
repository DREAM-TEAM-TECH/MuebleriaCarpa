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
public isLogged: any = false;

  constructor(private AFauth :  AngularFireAuth, public database: AngularFirestore) 
  { 
    AFauth.authState.subscribe(user => (this.isLogged = true))
  }

  async login(user: any)
  {
    
    return new Promise((resolve, rejected) =>{
      this.AFauth.signInWithEmailAndPassword(user.username, user.password).then(res => {
        resolve(res)
      }).catch(err => rejected(err));
    });
  }

  async onRegister(user: any)
  {
    return new Promise((resolve, rejected) =>{
      this.AFauth.createUserWithEmailAndPassword(user.username, user.password).then(res => {
        resolve(res)
      }).catch(err => rejected(err));
    });
  }

  logout()
  {
    return this.AFauth.signOut();
  }

  //Esto es con ReactiveForms
  agregar(proveedor: any): Promise<any>
  {
    return this.database.collection('Proveedores').add(proveedor);
  }
  getProveedores(): Observable<any>
  {
    return this.database.collection('Proveedores').snapshotChanges();
  }
  eliminarProvedor(id: string): Promise<any>
  {
    return this.database.collection('Proveedores').doc(id).delete();
  }
  getProveedor(id: string): Observable<any>
  {
    return this.database.collection('Proveedores').doc(id).snapshotChanges();
  }
  actualizarProveedor(id: string, data: any): Promise<any>
  {
    return this.database.collection('Proveedores').doc(id).update(data);
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

  getCollection<tipo>(path: string){
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
  setProduct(id: string): Observable<any> {
    return this.database.collection('Productos').doc(id).snapshotChanges();
  }

  getProduct(): Observable<any> {
    return this.database.collection('Productos', ref => ref.orderBy('category')).snapshotChanges();
  }

  addProduct(product: any): Promise<any>{
    return this.database.collection('Productos').add(product);
  }

  updateProduct(id: string, data: any): Promise<any>{
    return this.database.collection('Productos').doc(id).update(data);
  }

  deleteProduct(id: string): Promise<any> {
    return this.database.collection('Productos').doc(id).delete();
  }

  getEmpleados(): Observable<any> {
    return this.database.collection('Empleados').snapshotChanges();
  }

  getEmpleado(id: string): Observable<any>{
    return this.database.collection('Empleados').doc(id).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any>{
    return this.database.collection('Empleados').doc(id).delete();
  }

  agregarEmpleado(Empleado: any): Promise<any>{
    return this.database.collection('Empleados').add(Empleado);
  }

  actualizarEmpleado(id: string, data: any): Promise<any>{
    return this.database.collection('Empleados').doc(id).update(data);
  }
  // getEstados(): Observable<any> {
  //   return this.database.collection('Estados').snapshotChanges()
  // }
  // getMunicipios(doc): Observable<any> {
  //   return this.database.collection('Estados').doc(doc).collection('Municipios').snapshotChanges()
  // }
}
