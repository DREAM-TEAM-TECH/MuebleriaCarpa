import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {

  
  
  id: string | null
  createEmpleado: FormGroup
  public nombre:string;
  constructor(private router: Router, public firestoreService: FirestoreService, private actRoute: ActivatedRoute, private fb: FormBuilder) {
      
      this.createEmpleado = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required],
        sexo:['', Validators.required],
        fechaDeNacimiento: ['', Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        municipio: ['', Validators.required],
        colonia: ['', Validators.required],
        calle: ['', Validators.required],
        codigo_postal: ['' , Validators.required],
        num_exterior: ['' , Validators.required],
        telefono: ['' , Validators.required],
      })
      
      this.id = this.actRoute.snapshot.paramMap.get('employeeId')
   }
  
  ngOnInit() {
    this.Listar()
  }
  // ionViewWillEnter(){
  //   this.Listar()
  // }
  Listar()
  {
    if(this.id !== null)
    {
      this.firestoreService.getEmpleado(this.id).subscribe(data => {
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          email: data.payload.data()['email'],
          sexo: data.payload.data()['sexo'],
          fechaDeNacimiento: data.payload.data()['fecha_nacimiento'],
          categoria: data.payload.data()['id_categoria_empleado'],
          estado: data.payload.data()['id_estados'],
          municipio: data.payload.data()['id_Municipios'],
          colonia: data.payload.data()['id_colonia'],
          calle: data.payload.data()['calle'],
          codigo_postal: data.payload.data()['codigo_postal'],
          num_exterior: data.payload.data()['numero_exterior'],
          telefono: data.payload.data()['telefono'],
        })
        this.nombre = data.payload.data()['nombre'] + ' ' + data.payload.data()['apellido'];
      })
    }
  }
}
