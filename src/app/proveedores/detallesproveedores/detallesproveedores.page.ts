import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-detallesproveedores',
  templateUrl: './detallesproveedores.page.html',
  styleUrls: ['./detallesproveedores.page.scss'],
})
export class DetallesproveedoresPage implements OnInit {

  createProveedor: FormGroup;
  id: string | null; 

  constructor(public db: FirestoreService, private router: Router, private aRoute: ActivatedRoute, private fb: FormBuilder) 
  { 
    this.createProveedor = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      producto: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      codigo_postal: [null , Validators.required],
      num_exterior: [null , Validators.required],
      telefono: [null , Validators.required],
      empresa: [null , Validators.required],

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit() 
  {
    this.Listar();
  }

  Listar()
  {
    if(this.id !== null)
    {
      this.db.getProveedor(this.id).subscribe(data => {
        this.createProveedor.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          producto: data.payload.data()['producto'],
          estado: data.payload.data()['estado'],
          municipio: data.payload.data()['municipio'],
          colonia: data.payload.data()['colonia'],
          calle: data.payload.data()['calle'],
          codigo_postal: data.payload.data()['codigo_postal'],
          num_exterior: data.payload.data()['num_exterior'],
          telefono: data.payload.data()['telefono'],
          empresa: data.payload.data()['empresa'],
        })
      })
    }
  }

}
