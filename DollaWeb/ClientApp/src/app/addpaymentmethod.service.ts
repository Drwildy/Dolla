import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPaymentMethod} from './addpaymentmethod'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddpaymentmethodService {

  public dataChanged$: EventEmitter<AddPaymentMethod>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter<AddPaymentMethod>();
  }

  createPaymentMethod(paymentMethod: AddPaymentMethod): Observable<AddPaymentMethod> {
    return this.http.post<AddPaymentMethod>('/api/AddPaymentMethods', paymentMethod);
  }
  getPaymentMethod(): Observable<AddPaymentMethod[]> {
    return this.http.get<AddPaymentMethod[]>('/api/AddPaymentMethods/');
  }

  /*
  deletePaymentMethodById(id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   // return this.http.delete<AddPaymentMethod>('/api/AddPaymentMethods/delete=' + id, httpOptions);
    return this.http.delete<number>('/api/AddPaymentMethods / delete=' + id,
      httpOptions);
  }
  */

  deletePaymentMethod(id: number) {
    return this.http.delete('/api/AddPaymentMethods/' + id);
  }
}

