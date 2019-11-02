import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salary } from './salary';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }

  getSalary(): Observable<Salary>{
    return this.http.get<Salary>('/api/Salaries');
  }

  updateSalary(salary: Salary): Observable<Salary> {
    return this.http.put<Salary>('/api/Salaries', salary);
  }
}
