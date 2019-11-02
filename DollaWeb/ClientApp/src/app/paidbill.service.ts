import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaidBill } from './paidbill'
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaidBillService {

  public dataChanged$: EventEmitter<PaidBill>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter<PaidBill>();
  }
  getPayments(id: number): Observable<PaidBill[]> {
    return this.http.get<PaidBill[]>('/api/PaidBills/' + id);
  }

}
