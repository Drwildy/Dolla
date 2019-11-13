import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bill } from './bill';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public dataChanged$: EventEmitter<Bill>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter<Bill>();
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>('/api/Bills', bill);
  }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>('/api/bills/');
  }
  
  getBillsById(id: number): Observable<Bill> {
    return this.http.get<Bill>('/api/Bills/'+id);
  }
  
  editBill(id: number, bill:Bill): Observable<Bill> {
    return this.http.put<Bill>('/api/Bills/'+id, bill);
  }
 
}
