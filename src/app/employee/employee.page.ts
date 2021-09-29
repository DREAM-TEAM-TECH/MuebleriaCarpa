import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  empleados = []
  constructor(private router: Router, private employeeService:EmployeeService) { }

  ngOnInit() {
    this.empleados = this.employeeService.getEmployees()
  }
  
  addNewEmployee(){
    this.router.navigate(['/employee-add'])
  }
  detailEmployee(){
    this.router.navigate(['/employee-detail'])
  }
  
  
}  