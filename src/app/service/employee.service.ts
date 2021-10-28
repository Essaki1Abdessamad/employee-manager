import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  public employees !: Employee[];
  private apiServerUrl = environment.httpBaseUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]>{
    return  this.http.get<Employee[]>(`${this.apiServerUrl}/employees`);
  }

  public postEmployee(emp : Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiServerUrl+"/employees",emp);
  }

  public updateEmployee(emp : Employee): Observable<Employee>{
    return this.http.put<Employee>(this.apiServerUrl+"/employees",emp, {responseType: 'text' as 'json'});
  }

  public deleteEmployee(id : Number): Observable<any>{
    return this.http.delete<any>(this.apiServerUrl+"/employees/"+id, {responseType: 'text' as 'json'});
  }

}
