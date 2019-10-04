import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPaymentMethod} from './addpaymentmethod'

@Injectable({
  providedIn: 'root'
})
export class AddpaymentmethodService {
  constructor() { }
  AddPaymentMethod(): Observable<AddPaymentMethod[]> {
    let list: Array<AddPaymentMethod> = [];
    list.push(<AddPaymentMethod>{
      name: "Discover",
      color: "Orange"
    });
    list.push(<AddPaymentMethod>{
      name: "Visa",
      color: "Black"
    });
    list.push(<AddPaymentMethod>{
      name: "Mastercard",
      color: "Blue"
    });
    list.push(<AddPaymentMethod>{
      name: "Paypal",
      color: "Green"
    });
    return Observable.create(function (observer) {
      observer.next(list);
    });
  }
}
