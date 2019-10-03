import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from './bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor() { }

  getBanks(): Observable<Bank[]> {
    let list: Array<Bank> = [];
    list.push(<Bank>{
      id: 1,
      name: "Fast Food",
      createdDate: new Date(),
      amount: 75.12,
      setAmount: 100,
      icon: ''
    });
    list.push(<Bank>{
      id: 2,
      name: "Groceries",
      createdDate: new Date(),
      amount: 15.59,
      setAmount: 65,
      icon: ''
    });
    list.push(<Bank>{
      id: 3,
      name: "Splurge",
      createdDate: new Date(),
      amount: 1234.48,
      setAmount: 99,
      icon: ''
    });
    list.push(<Bank>{
      id: 1,
      name: "Fast Food",
      createdDate: new Date(),
      amount: 75.12,
      setAmount: 100,
      icon: ''
    });
    list.push(<Bank>{
      id: 2,
      name: "Groceries",
      createdDate: new Date(),
      amount: 15.59,
      setAmount: 65,
      icon: ''
    });
    list.push(<Bank>{
      id: 3,
      name: "Splurge",
      createdDate: new Date(),
      amount: 1234.48,
      setAmount: 99,
      icon: ''
    });
    list.push(<Bank>{
      id: 1,
      name: "Fast Food",
      createdDate: new Date(),
      amount: 75.12,
      setAmount: 100,
      icon: ''
    });
    list.push(<Bank>{
      id: 2,
      name: "Groceries",
      createdDate: new Date(),
      amount: 15.59,
      setAmount: 65,
      icon: ''
    });
    list.push(<Bank>{
      id: 3,
      name: "Splurge",
      createdDate: new Date(),
      amount: 1234.48,
      setAmount: 99,
      icon: ''
    });

    return Observable.create(function (observer) {
      observer.next(list);
    });
  }
}
