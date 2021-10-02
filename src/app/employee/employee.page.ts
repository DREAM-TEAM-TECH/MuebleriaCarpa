import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from "../servicios/firestore.service";
import { Empleado } from '../models';

import { collection, query, where } from "firebase/firestore";

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  
  empleados: any[] = []
  

  constructor(private router: Router, public firestoreService: FirestoreService) { }
  
  ngOnInit() {
    this.getEmpleados()
  }
  ionViewWillEnter(){
    this.getEmpleados()
  }

  getEmpleados() {
    this.firestoreService.getEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }
  
  addNewEmployee(){
    this.router.navigate(['/employee-add'])
  }
  detailEmployee(){
    this.router.navigate(['/employee-detail'])
  }
  
  eliminarEmpleado(id: string){
    
    this.firestoreService.eliminarEmpleado(id).then(() => {
      console.log('Empleado eliminado')
    }).catch(error => {
      console.log(error)
    })
  }
}  