import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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

  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
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
