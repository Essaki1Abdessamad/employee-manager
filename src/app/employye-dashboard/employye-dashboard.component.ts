import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  search = new FormControl('');

  constructor(private empService : EmployeeService, private formBuilder : FormBuilder){
    
    this.search.valueChanges
      .pipe(
         debounceTime(500),
         distinctUntilChanged(),
      )
      .subscribe(
        v => this.searchEmployees(v as string)
      );
  }

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
    this.empService.addEmployee(this.formValue.value)
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
    this.empService.deleteEmployee(id as number)
      .subscribe(res=>{
          alert("Employee deleted");
          this.getEmployees();
      })}
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

}

