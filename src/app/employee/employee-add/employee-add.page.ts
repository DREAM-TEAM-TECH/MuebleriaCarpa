import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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

  private empleadoForm1: FormGroup
  private municipioForm: FormGroup
  private coloniaForm: FormGroup
  private empleadoForm2: FormGroup;
  
  private id: null | string
  private titulo: string = ''
  private action:string

  private submitted = false
  


  constructor(private firestoreService:FirestoreService, private router:Router, private fb:FormBuilder, 
  private actRoute:ActivatedRoute, private alertController: AlertController,
  private loadingCtrl: LoadingController) {
    
    this.municipioForm = this.fb.group({municipio: ['', Validators.required],})
    this.coloniaForm = this.fb.group({colonia: ['', Validators.required]})
    this.empleadoForm1 = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellido: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        sexo:['', Validators.required],
        fechaDeNacimiento: ['', Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        // municipio: ['', Validators.required],
        // colonia: ['', Validators.required],
        // calle: ['', Validators.required],
        // codigo_postal: ['' , Validators.required],
        // num_exterior: ['' , Validators.required],
        // telefono: ['' , Validators.required],
      })
    this.empleadoForm2 = this.fb.group({
      calle: ['', [Validators.required, Validators.minLength(2)]],
      codigo_postal: ['' , [Validators.required, Validators.minLength(5)]],
      num_exterior: ['' , [Validators.required, Validators.minLength(3)]],
      telefono: ['' , [Validators.required, Validators.minLength(10)]],
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
        
        this.empleadoForm1.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          email: data.payload.data()['email'],
          sexo: data.payload.data()['sexo'],
          fechaDeNacimiento: data.payload.data()['fecha_nacimiento'],
          categoria: data.payload.data()['id_categoria_empleado'],
          estado: data.payload.data()['id_estados'],
          // municipio: data.payload.data()['id_Municipios'],
          // colonia: data.payload.data()['id_colonia'],

          // calle: data.payload.data()['calle'],
          // codigo_postal: data.payload.data()['codigo_postal'],
          // num_exterior: data.payload.data()['numero_exterior'],
          // telefono: data.payload.data()['telefono'],

          // empleado: data.payload.data()
        })
        this.municipioForm.setValue({municipio: data.payload.data()['id_Municipios']})
        this.coloniaForm.setValue({colonia: data.payload.data()['id_colonia']})
        this.empleadoForm2.setValue({
          calle: data.payload.data()['calle'],
          codigo_postal: data.payload.data()['codigo_postal'],
          num_exterior: data.payload.data()['numero_exterior'],
          telefono: data.payload.data()['telefono'],
        })
      })
  }

    //Guardar los datos
  private saveEmployee(){
    if(this.empleadoForm1.invalid || this.coloniaForm.invalid || this.empleadoForm2.invalid || this.municipioForm.invalid)
    {
      this.presentAlert();
      return;
    }
    if(this.id !== null){
      this.presentLoading('Guardando cambios...');
      const empleado: any = {
        nombre: this.empleadoForm1.value.nombre, 
        apellido: this.empleadoForm1.value.apellido,
        email: this.empleadoForm1.value.email,
        sexo: this.empleadoForm1.value.sexo,
        fecha_nacimiento: this.empleadoForm1.value.fechaDeNacimiento,
        categoria: this.empleadoForm1.value.categoria,
        id_estados: this.empleadoForm1.value.estado,

        //NO PELAR ESTO
        // id_Municipios: this.empleadoForm1.value.municipio,
        // id_colonia: this.empleadoForm1.value.colonia,

        id_Municipios: this.municipioForm.value.municipio,
        id_colonia: this.coloniaForm.value.colonia,

        calle: this.empleadoForm2.value.calle,
        codigo_postal: this.empleadoForm2.value.codigo_postal,
        numero_exterior: this.empleadoForm2.value.num_exterior,
        telefono: this.empleadoForm2.value.telefono,
      }
      this.firestoreService.actualizarEmpleado(this.id, empleado).then(() => {
        this.clearForm()
        this.router.navigate(['/employee'])
      })
    }
    if(this.id === null){
      this.presentLoading('Guardando...');
      const empleado: any = {
        nombre: this.empleadoForm1.value.nombre, 
        apellido: this.empleadoForm1.value.apellido,
        email: this.empleadoForm1.value.email,
        sexo: this.empleadoForm1.value.sexo,
        fecha_nacimiento: this.empleadoForm1.value.fechaDeNacimiento,
        id_categoria_empleado: this.empleadoForm1.value.categoria,
        id_estados: this.empleadoForm1.value.estado,

        //NO PELAR ESTO
        // id_Municipios: this.empleadoForm1.value.municipio,
        // id_colonia: this.empleadoForm1.value.colonia,

        id_Municipios: this.municipioForm.value.municipio,
        id_colonia: this.coloniaForm.value.colonia,
        calle: this.empleadoForm2.value.calle,
        codigo_postal: this.empleadoForm2.value.codigo_postal,
        numero_exterior: this.empleadoForm2.value.num_exterior,
        telefono: this.empleadoForm2.value.telefono,
      }
      this.firestoreService.agregarEmpleado(empleado).then(() => {
        this.clearForm()
        this.router.navigate(['/employee'])
      })
    }
    
  }

  private clearForm(){
    this.empleadoForm1.reset()
    this.coloniaForm.reset()
    this.municipioForm.reset()
    this.empleadoForm2.reset()
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
  private onChangeMunicipio(event){
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
  //Alerta
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Faltan uno o mas campos de llenar',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  //Mesaje de cargando
  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  
  }
}