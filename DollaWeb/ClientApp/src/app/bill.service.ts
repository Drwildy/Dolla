import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bill } from './bill';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  addItemTest(bill: Bill) {
    console.log(bill);
    this.http.post('/api/Bills', bill)
      .subscribe();
    console.log("Added Bill");
  }
  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>('/api/bills/');
  }
  /*
  getBillsById(id: number): Observable<Bill> {
    return this.http.get<Bill>('/api/Bills/'+id);
  }
  */
  getBillsById(id: number): Observable <Bill> {
    return this.http.get<Bill>("api/bills/" + id)
  }  
}
