import { Injectable } from '@angular/core';
import { Empleado } from '../employee/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empleados: Empleado[] = [{
    id: '1',
    nombre: 'Eustaquio',
    apellido: 'Habichuela',
    email: 'mamahuevo@gmail.com',
    sexo: 'masculino',
    fecha_nacimiento: '05/05/1990',
    id_categoria_empleado: '2',
    id_estados: '31',
    id_Municipios: '122',
    id_colonia: '4',
    calle: '34',
    codigo_postal: '3',
    numero_exterior: '219',
    telefono: '8121923712'
  },
  {
    id: '2',
    nombre: 'Perro',
    apellido: 'Bermudez',
    email: 'mamahuevo@gmail.com',
    sexo: 'masculino',
    fecha_nacimiento: '01/06/2002',
    id_categoria_empleado: '1',
    id_estados: '3',
    id_Municipios: '4',
    id_colonia: '5',
    calle: 'Tucan',
    codigo_postal: '66649',
    numero_exterior: '209',
    telefono: '1234567890'
  }
  ]

  constructor() { }

  addEmployee(_nombre, _apellido, _email, _sexo, fechaDeNacimiento, idCategoria, idEstado, idMunicipio, _calle, codigoPostal, numExterior, tel){
    this.empleados.push(
      _nombre,
      _apellido,
      _email,
      _sexo,
      fechaDeNacimiento,
      idCategoria,
      idEstado,
      idMunicipio,
      _calle,
      codigoPostal,
      numExterior
    )
  }
  deleteEmployee(id:string){
    this.empleados = this.empleados.filter(employee =>{
      return employee.id !== id;
    });
  }
  updateEmployee(empleado: Empleado,id:string){

  }
  getEmployee(id:string){
    return{
      ...this.empleados.find(employee =>{
        return employee.id === id;
      })
    };
  }
  getEmployees():Empleado[]{
    return [...this.empleados];
  }
}
