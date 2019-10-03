import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Envelope } from './envelope';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvelopeService {

  constructor(private http: HttpClient) { }
  addItemTest(envelope: Envelope) {
    console.log(envelope);
    console.log(this.http.post('/api/Envelopes', envelope)
      .subscribe());
    console.log("Added Envelope");
  }
  getEnvelopes(): Observable<Envelope[]> {
    let list: Array<Envelope> = [];
    //list.push(<Envelope> {
    //  id: 1,
    //  name: "Fast Food",
    //  createdDate: new Date(),
    //  amount: 75.12,
    //  setAmount: 100
    //});
    //list.push(<Envelope> {
    //  id: 2,
    //  name: "Groceries",
    //  createdDate: new Date(),
    //  amount: 15.59,
    //  setAmount: 65
    //});
    //list.push(<Envelope> {
    //  id: 3,
    //  name: "Splurge",
    //  createdDate: new Date(),
    //  amount: 1234.48,
    //  setAmount: 99
    //});

    return Observable.create(function (observer) {
      observer.next(list);
    });
  }

}
