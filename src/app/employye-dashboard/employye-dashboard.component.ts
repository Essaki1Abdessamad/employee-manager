import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employye-dashboard',
  templateUrl: './employye-dashboard.component.html',
  styleUrls: ['./employye-dashboard.component.css']
})
export class EmployyeDashboardComponent implements OnInit {



  public employees !: Employee[];

  constructor(private empService : EmployeeService){}

  ngOnInit(){
    this.getEmployees();
  }


  public getEmployees():void {
    this.empService.getEmployees()
      .subscribe
      (res =>{
        this.employees = res
      }),
      (error : HttpErrorResponse) =>{
        alert(error.message)
      }
  }

}
