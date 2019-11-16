import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod} from './paymentmethod'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  public dataChanged$: EventEmitter<PaymentMethod>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter<PaymentMethod>();
  }

  createPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>('/api/AddPaymentMethods', paymentMethod);
  }
  getPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>('/api/AddPaymentMethods/');
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

  editPaymentMethod(id: number, paymentMethod: PaymentMethod) {
    return this.http.put('/api/AddPaymentMethods/' + id, paymentMethod);
  }
}

