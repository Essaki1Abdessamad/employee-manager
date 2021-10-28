import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-employye-dashboard',
  templateUrl: './employye-dashboard.component.html',
  styleUrls: ['./employye-dashboard.component.css']
})
export class EmployyeDashboardComponent implements OnInit {


  showAdd !: boolean;
  showUpdate !: boolean;
  formValue !: FormGroup;
  public employees !: Employee[];
  employeeObj : Employee = new Employee();

  constructor(private empService : EmployeeService, private formBuilder : FormBuilder){}

  ngOnInit(){
    this.getEmployees();

    this.formValue = this.formBuilder.group({
      id : [''],
      name : [''],
      email : [''],
      phone : [''],
      jobTitle : [''],
      imgUrl : [''],
    })
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

  clickAddEmployee(){
    this.showUpdate = false,
    this.showAdd = true
  }

  onEdit(row : any){
    this.showUpdate = true,
    this.showAdd = false,

    this.formValue.controls['id'].setValue(row.id),
    this.formValue.controls['name'].setValue(row.name),
    this.formValue.controls['email'].setValue(row.email),
    this.formValue.controls['phone'].setValue(row.phone),
    this.formValue.controls['jobTitle'].setValue(row.jobTitle),
    this.formValue.controls['imgUrl'].setValue(row.imgUrl)
  }

  postEmployee(){
    this.empService.postEmployee(this.formValue.value)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployees();},
      err=>{
        console.log(err)
        alert("Couldn't Add the Employee")
      })  
  }

  updateEmployee(){
    console.log(this.formValue.value)
    this.empService.updateEmployee(this.formValue.value)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployees();},
      err=>{
        console.log(err)
        alert("Couldn't Update the Employee")
      }) 
  }

  onDelete(id : Number){
    if(confirm("Are you sure to delete "+id)) {
    this.empService.deleteEmployee(id)
      .subscribe(res=>{
          alert("Employee deleted");
          this.getEmployees();
      })}
  }

}
