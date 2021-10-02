import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Empleado, Estado } from '../../models'
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.page.html',
  styleUrls: ['./employee-add.page.scss'],
})
export class EmployeeAddPage implements OnInit {

  empleado:Empleado = {
    nombre: '',
    apellido: '',
    email: '',
    sexo: '',
    fecha_nacimiento: '',
    id_categoria_empleado: '',
    id_estados: '',
    id_Municipios: '',
    id_colonia: '',
    calle: '',
    codigo_postal: '',
    numero_exterior: '',
    telefono: ''
  }

  Estados:Estado[] = [] ;
  Municipios: [];
  Colonias: [];
  private path = 'Empleados/'
  private createEmpleado: FormGroup
  private id: null | string;
  public titulo: string = ''
  private submitted = false
  public action:string

  constructor(private firestoreService:FirestoreService, private router:Router, private fb:FormBuilder, private actRoute:ActivatedRoute) {
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
    this.firestoreService.getCollection<any>('/Estados').subscribe(res => {
      this.Estados = res
    })
    
    if(this.id === null){
      this.action = 'GUARDAR'
      this.addEmployee()
    }
    if(this.id  !== null){
      this.action = 'GUARDAR CAMBIOS'
      this.editEmployee()
    }
  }



  addEmployee(){
    this.titulo = 'Nuevo Empleado'
  }
  editEmployee(){
    this.titulo = 'Empleado'
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
          // empleado: data.payload.data()
        })
      })
  }

    //esta si la necesito
  saveEmployee(){
    if(this.createEmpleado.invalid)
    {
      // this.presentAlert();
      // return;
    }
    if(this.id !== null){
      const empleado: any = {
        nombre: this.createEmpleado.value.nombre, 
        apellido: this.createEmpleado.value.apellido,
        email: this.createEmpleado.value.email,
        sexo: this.createEmpleado.value.sexo,
        fecha_nacimiento: this.createEmpleado.value.fechaDeNacimiento,
        categoria: this.createEmpleado.value.categoria,
        id_estados: this.createEmpleado.value.estado,
        id_Municipios: this.createEmpleado.value.municipio,
        id_colonia: this.createEmpleado.value.colonia,
        calle: this.createEmpleado.value.calle,
        codigo_postal: this.createEmpleado.value.codigo_postal,
        numero_exterior: this.createEmpleado.value.num_exterior,
        telefono: this.createEmpleado.value.telefono,
      }
      this.firestoreService.actualizarEmpleado(this.id, empleado).then(() => {
        this.router.navigate(['/employee'])
      })
    }
    if(this.id === null){
      const empleado: any = {
        nombre: this.createEmpleado.value.nombre, 
        apellido: this.createEmpleado.value.apellido,
        email: this.createEmpleado.value.email,
        sexo: this.createEmpleado.value.sexo,
        fecha_nacimiento: this.createEmpleado.value.fechaDeNacimiento,
        categoria: this.createEmpleado.value.categoria,
        id_estados: this.createEmpleado.value.estado,
        id_Municipios: this.createEmpleado.value.municipio,
        id_colonia: this.createEmpleado.value.colonia,
        calle: this.createEmpleado.value.calle,
        codigo_postal: this.createEmpleado.value.codigo_postal,
        numero_exterior: this.createEmpleado.value.num_exterior,
        telefono: this.createEmpleado.value.telefono,
      }
      this.firestoreService.agregarEmpleado(empleado).then(() => {
        this.router.navigate(['/employee'])
      })
    }
  }
}
