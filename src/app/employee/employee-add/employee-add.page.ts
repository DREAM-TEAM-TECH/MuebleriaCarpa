import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.page.html',
  styleUrls: ['./employee-add.page.scss'],
})
export class EmployeeAddPage implements OnInit, AfterViewInit{

  
  private estado:string
  private municipio:string

  private Estados = [] 
  private Municipios = []
  private Colonias = []

  private createEmpleado: FormGroup
  private municipioForm: FormGroup
  private coloniaForm: FormGroup
  
  private id: null | string
  private titulo: string = ''
  private action:string

  private submitted = false


  constructor(private firestoreService:FirestoreService, private router:Router, private fb:FormBuilder, private actRoute:ActivatedRoute) {
    
    this.municipioForm = this.fb.group({municipio: ['', Validators.required],})
    this.coloniaForm = this.fb.group({colonia: ['', Validators.required]})
    this.createEmpleado = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required],
        sexo:['', Validators.required],
        fechaDeNacimiento: ['', Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        // municipio: ['', Validators.required],
        // colonia: ['', Validators.required],
        calle: ['', Validators.required],
        codigo_postal: ['' , Validators.required],
        num_exterior: ['' , Validators.required],
        telefono: ['' , Validators.required],
      })
      
      this.id = this.actRoute.snapshot.paramMap.get('employeeId')
   }
  
  public ngAfterViewInit(): void {
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

  public ngOnInit() {
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


  //Cargar los datos en caso de editar
  private addEmployee(){
    this.titulo = 'Nuevo Empleado'
  }

  private editEmployee(){
    this.titulo = 'Empleado'
      this.firestoreService.getEmpleado(this.id).subscribe(data => {
        this.municipioForm.setValue({municipio: data.payload.data()['id_Municipios']})
        this.coloniaForm.setValue({colonia: data.payload.data()['id_colonia']})
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          email: data.payload.data()['email'],
          sexo: data.payload.data()['sexo'],
          fechaDeNacimiento: data.payload.data()['fecha_nacimiento'],
          categoria: data.payload.data()['id_categoria_empleado'],
          estado: data.payload.data()['id_estados'],
          // municipio: data.payload.data()['id_Municipios'],
          // colonia: data.payload.data()['id_colonia'],
          calle: data.payload.data()['calle'],
          codigo_postal: data.payload.data()['codigo_postal'],
          num_exterior: data.payload.data()['numero_exterior'],
          telefono: data.payload.data()['telefono'],
          // empleado: data.payload.data()
        })
      })
  }

    //Guardar los datos
  private saveEmployee(){
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

        //NO PELAR ESTO
        // id_Municipios: this.createEmpleado.value.municipio,
        // id_colonia: this.createEmpleado.value.colonia,

        id_Municipios: this.municipioForm.value.municipio,
        id_colonia: this.coloniaForm.value.colonia,
        calle: this.createEmpleado.value.calle,
        codigo_postal: this.createEmpleado.value.codigo_postal,
        numero_exterior: this.createEmpleado.value.num_exterior,
        telefono: this.createEmpleado.value.telefono,
      }
      this.firestoreService.actualizarEmpleado(this.id, empleado).then(() => {
        this.createEmpleado.reset()
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
        id_categoria_empleado: this.createEmpleado.value.categoria,
        id_estados: this.createEmpleado.value.estado,

        //NO PELAR ESTO
        // id_Municipios: this.createEmpleado.value.municipio,
        // id_colonia: this.createEmpleado.value.colonia,
        
        id_Municipios: this.municipioForm.value.municipio,
        id_colonia: this.coloniaForm.value.colonia,
        calle: this.createEmpleado.value.calle,
        codigo_postal: this.createEmpleado.value.codigo_postal,
        numero_exterior: this.createEmpleado.value.num_exterior,
        telefono: this.createEmpleado.value.telefono,
      }
      this.firestoreService.agregarEmpleado(empleado).then(() => {
        this.createEmpleado.reset()
        this.router.navigate(['/employee'])
      })
    }
    
  }

  private clearForm(){
    this.createEmpleado.reset()
  }
  
  private onChangeEstado(event){
    try{
      //Tomamos el valor del ion-option
      this.estado = event.target.value
      //Pasamos el valor del estado para poder acceder a los Municipios
      this.firestoreService.getCollection<any>('Estados/' + event.target.value + '/Municipios').subscribe(res => {
        this.Municipios = res
      })
      //Aquí se resetean los formularios de municipio y colonia
      this.municipioForm.reset()
      this.coloniaForm.reset()
    }catch(e){}
  }
  onChangeMunicipio(event){
    try{
      //Tomamos el valor del ion-option
      this.municipio = event.target.value
      //Pasamos el valor del municipio y del estado para poder acceder a las colonias
      this.firestoreService.getCollection<any>('Estados/' + this.estado + '/Municipios/' + this.municipio + '/Colonias').subscribe(res => {
        this.Colonias = res
      })
      //Aquí se resetea el formulario de colonia
      this.coloniaForm.reset()
    }catch(e){}
  }
}