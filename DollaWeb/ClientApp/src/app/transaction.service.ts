import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }
  getTransaction(): Observable<Transaction[]> {
    let list: Array<Transaction> = [];
    list.push(<Transaction>{
      id: 1,
      name: "Food",
      createdDate: new Date(),
      amount: 5.49,
    });
    list.push(<Transaction>{
      id: 1,
      name: "Food",
      createdDate: new Date(),
      amount: 2.99,
    });
    list.push(<Transaction>{
      id: 1,
      name: "Car Payment",
      createdDate: new Date(),
      amount: 430.89,
    });
    list.push(<Transaction>{
      id: 1,
      name: "Electricity",
      createdDate: new Date(),
      amount: 90.65,
    });
    list.push(<Transaction>{
      id: 1,
      name: "College",
      createdDate: new Date(),
      amount: 549.76,
    });
    list.push(<Transaction>{
      id: 1,
      name: "Tuition",
      createdDate: new Date(),
      amount: 1234.54,
    });

    return Observable.create(function (observer) {
      observer.next(list);
    });
  }
}
