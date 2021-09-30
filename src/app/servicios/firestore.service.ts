import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}
