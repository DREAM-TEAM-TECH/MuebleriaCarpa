import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs'
import { AngularFirestore} from '@angular/fire/compat/firestore';

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

  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

}
