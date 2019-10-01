import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Envelope } from './envelope';

@Injectable({
  providedIn: 'root'
})
export class EnvelopeService {

  constructor() { }

  getEnvelopes(): Observable<Envelope[]> {
    let list: Array<Envelope> = [];
    list.push(<Envelope> {
      id: 1,
      name: "Fast Food",
      createdDate: new Date(),
      amount: 75.12,
      setAmount: 100
    });
    list.push(<Envelope> {
      id: 2,
      name: "Groceries",
      createdDate: new Date(),
      amount: 15.59,
      setAmount: 65
    });
    list.push(<Envelope> {
      id: 3,
      name: "Splurge",
      createdDate: new Date(),
      amount: 1234.48,
      setAmount: 99
    });

    return Observable.create(function (observer) {
      observer.next(list);
    });
  }

}
