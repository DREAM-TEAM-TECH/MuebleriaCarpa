import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private AFauth :  AngularFireAuth, public db: AngularFirestore) { }

  login(email:string, password:string)
  {
    return new Promise((resolve, rejected) =>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user)
      }).catch(err => rejected(err));
    });
  }

  getCollection<tipo>(path: string)
  {
    const collection = this.db.collection<tipo>(path);
    return collection.valueChanges();
  }

  createDoc(data: any, path: string, id:string)
  {
    const collection = this.db.collection(path);
    return collection.doc(id).set(data);
  }

  getId()
  {
    return this.db.createId();
  }
}
